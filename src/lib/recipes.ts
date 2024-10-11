import { CommandType } from "@/types/command";
import type { Recipe } from "@/types/recipe";

const recipes: Recipe[] = [
  {
    id: "1",
    name: "Check if exists",
    description: "Check if file or directory exists",
    commands: [
      {
        id: "1",
        type: CommandType.Basic,
        name: "mkdir",
        description: "Creates a new directory",
        payload: "mkdir",
        options: [],
        parameters: [
          {
            id: "1",
            name: "Directory name",
            description: "The name of the directory to create",
            payload: "[Directory name]",
          },
        ],
      },
    ],
  },
];

export { recipes };
