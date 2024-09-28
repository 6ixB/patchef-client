import {
  type DragOverEvent,
  type DragStartEvent,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { CommandListItem } from "@/components/commands/command-list-item";
import { RecipeListItem } from "@/components/recipe/recipe-list-item";
import { useCommandStore } from "@/hooks/use-command-store";
import { DndContextEventDataType } from "@/types/dnd-context";
import { v4 as generateUuidV4 } from "uuid";
import { useImmer } from "use-immer";
import { type ReactNode, useMemo } from "react";

export interface DndContextProviderProps {
  children: ReactNode;
}

export interface IdPair {
  initial: string | null;
  final: string | null;
}

const DndContextProvider = ({ children }: DndContextProviderProps) => {
  /* 
    This sets up how far the pointer should move before the dragging starts. This is to prevent
    accidental drags when the user is trying to click on a command to edit it.
  */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 32,
      },
    }),
  );

  const {
    destinationCommands,
    activeSourceCommand,
    setActiveSourceCommand,
    activeDestinationCommand,
    setActiveDestinationCommand,
    setIsDragging,
    updateSourceCommandId,
    appendDestinationCommand,
    insertDestinationCommand,
    removeDestinationCommand,
    swapDestinationCommands,
  } = useCommandStore();

  const alreadyDropped = useMemo(() => {
    if (destinationCommands && activeSourceCommand) {
      return !!destinationCommands.find(
        (command) => command.id === activeSourceCommand?.id,
      );
    }
    return false;
  }, [destinationCommands, activeSourceCommand]);

  /* 
    Usage: id pair is an object that holds the initial and final ids of the dragged command.
    This object is used to separate the commands that are being dragged and dropped. This is done
    to make DndContext aware that the dropped command is different from the dragged command such
    that the dropped command will not reference the dragged command as this will cause issues when
    the dropped command is used.

    Basically dropped command will have the dragged command's id and the dragged command's id
    will be updated to a new id using (UUID).

    Note: should probably change to an id that is more collision resistant (CUID) rather than UUID.

    FAQ:
    Why not just use a new id for the dropped command?
    Because for the drag and drop animation to look smooth, the dropped command should be the same
    as the dragged command. As if the dragged command is being moved to a new location. When you use
    a new id the dropped command would like it just appeared out of nowhere.

    - MY23-1
    */
  const [idPair, setIdPair] = useImmer<IdPair>({
    initial: null,
    final: null,
  });

  const resetDndContextStates = () => {
    setActiveSourceCommand(null);
    setActiveDestinationCommand(null);
    setIsDragging(false);
    setIdPair((draft) => {
      draft.initial = null;
      draft.final = null;
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    /* 
      Get the active node from the event, active node is the node that is currently being dragged.
    */
    const activeNode = event.active.data.current;

    if (!activeNode) {
      return;
    }

    const activeNodeType = activeNode.type;

    /* 
      Dragging a source command towards the recipe area's dropzone (destination commands).
    */
    if (activeNodeType === DndContextEventDataType.SourceCommand) {
      setActiveSourceCommand(activeNode.command);
      setIsDragging(true);
      return;
    }

    /* 
      Dragging a destination command within the recipe area's dropzone (destination commands).
    */
    if (activeNodeType === DndContextEventDataType.DestinationCommand) {
      setActiveDestinationCommand(activeNode.command);
      setIsDragging(true);
      return;
    }
  };

  const handleDragEnd = () => {
    resetDndContextStates();
    if (!(activeSourceCommand && idPair.initial && idPair.final)) {
      return;
    }
    updateSourceCommandId(idPair.initial, idPair.final);
  };

  const handleDragCancel = () => {
    resetDndContextStates();
    if (!(alreadyDropped && idPair.initial && idPair.final)) {
      return;
    }
    updateSourceCommandId(idPair.initial, idPair.final);
    removeDestinationCommand(idPair.initial);
  };

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: I believe this function is fine as is - MY23-1)
  const handleDragOver = (event: DragOverEvent) => {
    if (!(activeSourceCommand || activeDestinationCommand)) {
      return;
    }

    /* 
      Get the over node from the event, over node is the node that is currently being hovered over.
    */
    const overNode = event.over?.data.current;

    if (!overNode) {
      return;
    }

    /* 
      Dragging a source command towards the sidebar source commands cancels the drag operation.
    */
    if (
      overNode.type === DndContextEventDataType.SourceCommand ||
      overNode.type === DndContextEventDataType.SidebarSourceCommands
    ) {
      if (!(alreadyDropped && idPair.initial && idPair.final)) {
        return;
      }
      updateSourceCommandId(idPair.initial, idPair.final);
      removeDestinationCommand(idPair.initial);
      return;
    }

    /* 
      Dragging a destination command inside the recipe area's dropzone (destination commands) will
      swap the active destination command with the over node command.
    */
    if (
      activeDestinationCommand &&
      overNode.type === DndContextEventDataType.DestinationCommand
    ) {
      const index = destinationCommands.findIndex(
        (command) => command.id === overNode.command.id,
      );

      if (index === -1) {
        return;
      }

      if (activeDestinationCommand.id === overNode.command.id) {
        return;
      }

      swapDestinationCommands(activeDestinationCommand.id, overNode.command.id);
    }

    /* 
      Because dragging over creates an instance of a destination command, we need to make sure
      that the new instance will not cause any errors of duplicates when the active source command
      is still being hovered over the destination command.
    */
    if (!activeSourceCommand) {
      return;
    }

    if (
      overNode.type === DndContextEventDataType.DestinationCommand &&
      overNode.command.id === activeSourceCommand.id
    ) {
      return;
    }

    /*
      If the active source command is already dropped and the over node is a destination command,
      the active source command will be swapped with the over node command.
    */
    if (
      alreadyDropped &&
      overNode.type === DndContextEventDataType.DestinationCommand
    ) {
      swapDestinationCommands(activeSourceCommand.id, overNode.command.id);
    }

    /* 
      Already dropped is a boolean that is used to prevent the active source command from being
      dropped multiple times while the active source command is still being dragged.
    */
    if (alreadyDropped || !activeSourceCommand) {
      return;
    }

    /* 
      Below are the conditions for dropping (creating an instance / not already dropped) a command:
      1. Over a recipe area dropzone.
      2. Over a destination command.

      If the active node is a source command and the over node is a destination command, the
      active source command will be inserted before the over node command. If the over node is a
      recipe area dropzone, the active source command will be appended to the destination commands.
    */

    const isOverRecipeAreaDropZone =
      overNode.type === DndContextEventDataType.RecipeAreaDropzone;
    const isOverDestinationCommand =
      overNode.type === DndContextEventDataType.DestinationCommand;

    if (isOverRecipeAreaDropZone) {
      appendDestinationCommand(activeSourceCommand);
    } else if (isOverDestinationCommand) {
      const index = destinationCommands.findIndex(
        (command) => command.id === overNode.command.id,
      );
      insertDestinationCommand(index, activeSourceCommand);
    }

    setIdPair((draft) => {
      draft.initial = activeSourceCommand.id;
      draft.final = generateUuidV4();
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
    >
      {createPortal(
        <DragOverlay>
          {activeSourceCommand && (
            <CommandListItem command={activeSourceCommand} />
          )}
          {activeDestinationCommand && (
            <RecipeListItem command={activeDestinationCommand} />
          )}
        </DragOverlay>,
        document.body,
      )}
      {children}
    </DndContext>
  );
};

export { DndContextProvider };
