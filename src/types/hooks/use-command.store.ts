import type { CommandEntity } from "@/types/commands/command.entity";
import type { CommandPreviewEntity } from "@/types/commands/command-preview.entity";
import type { CreateCommandDto } from "@/types/commands/command.dto";

enum ManageState {
  View = "VIEW",
  Edit = "EDIT",
  Create = "CREATE",
}

interface CommandState {
  /* 
      Usage: initial source commands are the fallback commands that are displayed in the sidebar.
      These commands are used when the user clears the search input.
    */
  initialSourceCommands: CommandEntity[];
  setInitialSourceCommands: (
    value: ((draft: CommandEntity[]) => void) | CommandEntity[],
  ) => void;

  /* 
      Usage: source commands are the commands that are displayed in the sidebar.
      These commands are the ones that can be dragged and dropped into the destination commands.
    */
  sourceCommands: CommandEntity[];
  setSourceCommands: (
    value: ((draft: CommandEntity[]) => void) | CommandEntity[],
  ) => void;

  /* 
      Usage: destination commands are the commands that are displayed in the recipe area's dropzone.
      These commands are the ones that will be executed in the final batch script.
    */
  destinationCommands: CommandEntity[];
  setDestinationCommands: (
    value: ((draft: CommandEntity[]) => void) | CommandEntity[],
  ) => void;

  /* 
      Usage: active source command is the command that is currently being dragged.
      This command is displayed in the drag overlay.
    */
  activeSourceCommand: CommandEntity | null;
  setActiveSourceCommand: (command: CommandEntity | null) => void;

  /* 
      Usage: active destination command is the command that is currently being dragged.
      This command is displayed in the drag overlay.
    */
  activeDestinationCommand: CommandEntity | null;
  setActiveDestinationCommand: (command: CommandEntity | null) => void;

  /* 
      Usage: filter commands is a function that filters the source commands based on the query.
      This function is used to filter the commands based on the search input in the sidebar.  
    */
  filterCommands: (query: string) => void;

  /* 
      Usage: update source command id is a function that updates the id of a source command.
      This function is used to update the id of a source command when it is dropped in the recipe area's dropzone.
    */
  updateSourceCommandId: (id: string, newId: string) => void;

  /* 
      Usage: remove source command is a function that removes a command from the source commands.
      This function is used to remove a command from the sidebar.
  */
  removeSourceCommand: (originalId: string) => void;

  /* 
      Usage: append destination command is a function that appends a command to the destination commands.
      This function is used to add a command to the recipe area's dropzone.
    */
  appendDestinationCommand: (command: CommandEntity) => void;

  /* 
      Usage: insert destination command is a function that inserts a command at a specific index in the destination commands.
      This function is used to insert a command at a specific position in the recipe area's dropzone.
    */
  insertDestinationCommand: (index: number, command: CommandEntity) => void;

  /* 
      Usage: swap destination commands is a function that swaps the positions of two commands in the destination commands.
      This function is used to swap the positions of two commands in the recipe area's dropzone.
    */
  swapDestinationCommands: (sourceId: string, destinationId: string) => void;

  /* 
      Usage: remove destination command is a function that removes a command from the destination commands.
      This function is used to remove a command from the recipe area's dropzone.
    */
  removeDestinationCommand: (id: string) => void;

  /* 
      Usage: clear destination commands is a function that clears all the commands in the destination commands.
      This function is used to clear the recipe area's dropzone.
    */
  clearDestinationCommands: () => void;

  /* 
      Usage: is dragging is a boolean that indicates whether a command is currently being dragged.
    */
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;

  /* 
      Usage: determines the rendered view of the manage command dialog content
    */
  manageState: ManageState;
  setManageState: (state: ManageState) => void;

  /* 
      Usage: draft command is the command that is currently being created.
      This command is used to store the current state of the command being created.
    */
  draftCommand: CreateCommandDto | null;
  setDraftCommand: (
    value: ((draft: CreateCommandDto | null) => void) | CreateCommandDto | null,
  ) => void;

  revisedCommand: CommandEntity | null;
  setRevisedCommand: (
    value: ((draft: CommandEntity | null) => void) | CommandEntity | null,
  ) => void;

  /* 
      Usage: command previews is an array consisting of commands in the form of what would be in a bat file.
    */
  commandPreviews: CommandPreviewEntity[];
  setCommandPreviews: () => void;
}

export { type CommandState, ManageState };
