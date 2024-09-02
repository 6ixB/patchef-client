import {
  DndContext,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import CommandListItem from "@/components/commands/command-list-item";
import { useCommandStore } from "@/hooks/use-command-store";
import { DndContextEventDataType } from "@/types/dnd-context";

interface DndContextProviderProps {
  children: React.ReactNode;
}

const DndContextProvider = ({ children }: DndContextProviderProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const { activeCommand, setActiveCommand } = useCommandStore();

  const resetDndContextStates = () => {
    setActiveCommand(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === DndContextEventDataType.COMMAND) {
      setActiveCommand(event.active.data.current.command);
      return;
    }
  };

  const handleDragEnd = () => {
    resetDndContextStates();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {createPortal(
        <DragOverlay>
          {activeCommand && <CommandListItem command={activeCommand} />}
        </DragOverlay>,
        document.body
      )}
      {children}
    </DndContext>
  );
};

export default DndContextProvider;
