import type { Command } from "@/types/command";

export enum ManageState {
  View = "VIEW",
  Edit = "EDIT",
  Create = "CREATE",
}
import type { CommandPreview } from "./command-preview";

export interface CommandState {
  /* 
      Usage: initial source commands are the fallback commands that are displayed in the sidebar.
      These commands are used when the user clears the search input.
    */
  initialSourceCommands: Command[];

  /* 
      Usage: source commands are the commands that are displayed in the sidebar.
      These commands are the ones that can be dragged and dropped into the destination commands.
    */
  sourceCommands: Command[];
  setSourceCommands: (commands: Command[]) => void;

  /* 
      Usage: destination commands are the commands that are displayed in the recipe area's dropzone.
      These commands are the ones that will be executed in the final batch script.
    */
  destinationCommands: Command[];
  setDestinationCommands: (commands: Command[]) => void;

  /* 
      Usage: active source command is the command that is currently being dragged.
      This command is displayed in the drag overlay.
    */
  activeSourceCommand: Command | null;
  setActiveSourceCommand: (command: Command | null) => void;

  /* 
      Usage: active destination command is the command that is currently being dragged.
      This command is displayed in the drag overlay.
    */
  activeDestinationCommand: Command | null;
  setActiveDestinationCommand: (command: Command | null) => void;

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
      Usage: append destination command is a function that appends a command to the destination commands.
      This function is used to add a command to the recipe area's dropzone.
    */
  appendDestinationCommand: (command: Command) => void;

  /* 
      Usage: insert destination command is a function that inserts a command at a specific index in the destination commands.
      This function is used to insert a command at a specific position in the recipe area's dropzone.
    */
  insertDestinationCommand: (index: number, command: Command) => void;

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
      Usage: is managing is a boolean that indicates whether the user is currently managing the commands.
    */
  isManaging: boolean;
  setIsManaging: (isManaging: boolean) => void;

  manageState: ManageState;
  setManageState: (state: ManageState) => void;

  draftCommand: Command | null;
  setDraftCommand: (command: Command | null) => void;

  /* 
      Usage: command previews is an array consisting of commands in the form of what would be in a bat file.
    */
  commandPreviews: CommandPreview[];
  setCommandPreviews: () => void;
}
