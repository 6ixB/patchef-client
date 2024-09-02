import { commands } from "@/lib/commands";
import type { Command } from "@/types/command";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

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
    Usage: active command is the command that is currently being dragged.
    This command is displayed in the drag overlay.
  */
  activeCommand: Command | null;
  setActiveCommand: (command: Command | null) => void;

  /* 
    Usage: filter commands is a function that filters the source commands based on the query.
    This function is used to filter the commands based on the search input in the sidebar.  
  */
  filterCommands: (query: string) => void;
}

/* 
  Usage: create a store for the command state.
  This store is used to manage the state of the commands in the application.

  Note: immer is used to enable the use of mutable updates in the set function.
*/
export const useCommandStore = create<CommandState>()(
  immer((set) => ({
    initialSourceCommands: commands,

    sourceCommands: commands,
    setSourceCommands: (commands) =>
      set((state) => {
        state.sourceCommands = commands;
      }),

    destinationCommands: [],
    setDestinationCommands: (commands) =>
      set((state) => {
        state.destinationCommands = commands;
      }),

    activeCommand: null,
    setActiveCommand: (command) =>
      set((state) => {
        state.activeCommand = command;
      }),

    filterCommands: (query) =>
      set((state) => {
        if (!query) {
          state.sourceCommands = state.initialSourceCommands;
        }

        const filteredCommands = state.initialSourceCommands.filter((command) =>
          command.name.toLowerCase().includes(query.toLowerCase())
        );

        state.sourceCommands = filteredCommands;
      }),
  }))
);
