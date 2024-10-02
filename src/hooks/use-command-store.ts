import { commands } from "@/lib/commands";
import { ManageState, type CommandState } from "@/types/use-command.store";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import { v4 as generateUuidV4 } from "uuid";
import type { CommandPreview } from "@/types/command-preview";
import { generateCommandString } from "@/lib/utils";

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

    activeSourceCommand: null,
    setActiveSourceCommand: (command) =>
      set((state) => {
        state.activeSourceCommand = command;
      }),

    activeDestinationCommand: null,
    setActiveDestinationCommand: (command) =>
      set((state) => {
        state.activeDestinationCommand = command;
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

    updateSourceCommandId: (id, newId) => {
      set((state) => {
        const sourceIndex = state.sourceCommands.findIndex(
          (command) => command.id === id
        );

        const initalSourceIndex = state.initialSourceCommands.findIndex(
          (command) => command.id === id
        );

        if (sourceIndex !== -1 && initalSourceIndex !== -1) {
          state.sourceCommands[sourceIndex].id = newId;
          state.initialSourceCommands[initalSourceIndex].id = newId;
        }
      });
    },

    removeSourceCommand: (id) => {
      set((state) => {
        const index = state.sourceCommands.findIndex(
          (command) => command.id === id
        );

        if (index !== -1) {
          state.sourceCommands.splice(index, 1);
        }
      });
    },

    appendDestinationCommand: (command) => {
      set((state) => {
        state.destinationCommands.push(command);
      });
    },

    insertDestinationCommand: (index, command) => {
      set((state) => {
        state.destinationCommands.splice(index, 0, command);
      });
    },

    swapDestinationCommands: (sourceId, destinationId) => {
      set((state) => {
        const sourceIndex = state.destinationCommands.findIndex(
          (command) => command.id === sourceId
        );

        const destinationIndex = state.destinationCommands.findIndex(
          (command) => command.id === destinationId
        );

        if (sourceIndex !== -1 && destinationIndex !== -1) {
          const temp = state.destinationCommands[sourceIndex];
          state.destinationCommands[sourceIndex] =
            state.destinationCommands[destinationIndex];
          state.destinationCommands[destinationIndex] = temp;
        }
      });
    },

    removeDestinationCommand: (id) => {
      set((state) => {
        const index = state.destinationCommands.findIndex(
          (command) => command.id === id
        );

        if (index !== -1) {
          state.destinationCommands.splice(index, 1);
        }
      });
    },

    clearDestinationCommands: () =>
      set((state) => {
        while (state.destinationCommands.length > 0) {
          state.destinationCommands.pop();
        }
      }),

    isDragging: false,
    setIsDragging: (isDragging) =>
      set((state) => {
        state.isDragging = isDragging;
      }),

    manageState: ManageState.View,
    setManageState: (manageState) =>
      set((state) => {
        state.manageState = manageState;
      }),

    draftCommand: null,
    setDraftCommand: (value) =>
      set((state) => {
        if (typeof value === "function") {
          state.draftCommand = produce(state.draftCommand, value);
        } else {
          state.draftCommand = value;
        }
      }),

    commandPreviews: [],
    setCommandPreviews: () =>
      set((state) => {
        state.commandPreviews = state.destinationCommands.map((command) => {
          const commandString = generateCommandString(command);

          const commandPreview: CommandPreview = {
            id: generateUuidV4(),
            preview: commandString.trim(),
          };

          return commandPreview;
        });
      }),
  }))
);
