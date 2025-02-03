import { generateCommandString } from "@/services/commands.service";
import type { CommandPreviewEntity } from "@/types/commands/command-preview.entity";
import {
  type CommandState,
  ManageCommandState,
} from "@/types/hooks/use-command.store";
import { produce } from "immer";
import { v4 as generateUuidV4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/* 
  Usage: create a store for the command state.
  This store is used to manage the state of the commands in the application.

  Note: immer is used to enable the use of mutable updates in the set function.
*/
const useCommandStore = create<CommandState>()(
  persist(
    immer((set) => ({
      initialSourceCommands: [],
      setInitialSourceCommands: (value) =>
        set((state) => {
          if (typeof value === "function") {
            state.initialSourceCommands = produce(
              state.initialSourceCommands,
              value,
            );
          } else {
            state.initialSourceCommands = value;
          }

          /* 
            Everytime the initial source commands are set, the destination commands are also updated,
            to prevent having the same id with any of the source commands, a new id is generated.
          */
          state.destinationCommands = state.destinationCommands.map(
            (command) => ({ ...command, id: generateUuidV4() }),
          );
        }),

      sourceCommands: [],
      setSourceCommands: (value) =>
        set((state) => {
          if (typeof value === "function") {
            state.sourceCommands = produce(state.sourceCommands, value);
          } else {
            state.sourceCommands = value;
          }
        }),

      destinationCommands: [],
      setDestinationCommands: (value) =>
        set((state) => {
          if (typeof value === "function") {
            state.destinationCommands = produce(
              state.destinationCommands,
              value,
            );
          } else {
            state.destinationCommands = value;
          }
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

          const filteredCommands = state.initialSourceCommands.filter(
            (command) =>
              command.name.toLowerCase().includes(query.toLowerCase()),
          );

          state.sourceCommands = filteredCommands;
        }),

      updateSourceCommandId: (id, newId) => {
        set((state) => {
          const sourceIndex = state.sourceCommands.findIndex(
            (command) => command.id === id,
          );

          const initalSourceIndex = state.initialSourceCommands.findIndex(
            (command) => command.id === id,
          );

          if (sourceIndex !== -1 && initalSourceIndex !== -1) {
            state.sourceCommands[sourceIndex].id = newId;
            state.initialSourceCommands[initalSourceIndex].id = newId;
          }
        });
      },

      removeSourceCommand: (originalId) => {
        set((state) => {
          const sourceIndex = state.sourceCommands.findIndex(
            (command) => command.originalId === originalId,
          );

          const initalSourceIndex = state.initialSourceCommands.findIndex(
            (command) => command.originalId === originalId,
          );

          if (sourceIndex !== -1 && initalSourceIndex !== -1) {
            state.sourceCommands.splice(sourceIndex, 1);
            state.initialSourceCommands.splice(initalSourceIndex, 1);
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
            (command) => command.id === sourceId,
          );

          const destinationIndex = state.destinationCommands.findIndex(
            (command) => command.id === destinationId,
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
            (command) => command.id === id,
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

      manageCommandState: ManageCommandState.View,
      setManageCommandState: (manageState) =>
        set((state) => {
          state.manageCommandState = manageState;
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

      revisedCommand: null,
      setRevisedCommand: (value) =>
        set((state) => {
          if (typeof value === "function") {
            state.revisedCommand = produce(state.revisedCommand, value);
          } else {
            state.revisedCommand = value;
          }
        }),

      commandPreviews: [],
      setCommandPreviews: () =>
        set((state) => {
          state.commandPreviews = state.destinationCommands.map((command) => {
            const commandString = generateCommandString(command);

            const commandPreview: CommandPreviewEntity = {
              id: generateUuidV4(),
              preview: commandString.trim(),
            };

            return commandPreview;
          });
        }),
    })),
    {
      /* 
        This stores the currently worked recipe (destination commands) to be
        be stored in local storage, and when it is rehydrated (reloaded), to prevent
        having the same id with any of the source commands, a new id is generated
        for each destination command. - MY23-1
      */
      name: "command-store",
      partialize: (state) => ({
        destinationCommands: state.destinationCommands,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (state) {
            state.destinationCommands = state.destinationCommands.map(
              (command) => {
                return { ...command, id: generateUuidV4() };
              },
            );
          }

          if (error) {
            console.error("an error happened during hydration", error);
          } else {
            console.info("hydration finished");
          }
        };
      },
    },
  ),
);

export { useCommandStore };
