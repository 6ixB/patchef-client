import type { Command } from "@/types/command";

export const commands: Command[] = [
  {
    id: "1",
    name: "mkdir",
    description: "Creates a new directory",
    payload: "mkdir",
    options: [],
    parameters: [
      {
        name: "Directory name",
        description: "The name of the directory to create",
      },
    ],
  },
  {
    id: "2",
    name: "ls",
    description: "Lists the contents of a directory",
    payload: "ls",
    options: [],
    parameters: [
      {
        name: "Directory path",
        description: "The directory to list the contents of",
      },
    ],
  },
  {
    id: "3",
    name: "cd",
    description: "Changes the current directory",
    payload: "cd",
    options: [],
    parameters: [
      {
        name: "Directory path",
        description: "The directory to change to",
      },
    ],
  },
  {
    id: "4",
    name: "rm",
    description: "Removes a file or directory",
    payload: "rm",
    options: [
      {
        name: "Recursive",
        description: "Recursively remove directories",
        payload: "-r",
        parameterRequired: false,
        parameters: [],
      },
    ],
    parameters: [
      {
        name: "File or directory path",
        description: "The file or directory to remove",
      },
    ],
  },
  {
    id: "5",
    name: "echo",
    description: "Displays a line of text",
    payload: "echo",
    options: [],
    parameters: [
      {
        name: "Text",
        description: "The text to display",
      },
    ],
  },
  {
    id: "6",
    name: "xcopy",
    description: "Copies files and directories",
    payload: "xcopy",
    options: [
      {
        name: "Recursive",
        description: "Recursively copy directories",
        payload: "/s",
        parameterRequired: false,
        parameters: [],
      },
    ],
    parameters: [
      {
        name: "Source file or directory path",
        description: "The source file or directory",
      },
      {
        name: "Destination file or directory path",
        description: "The destination file or directory",
      },
    ],
  },
  {
    id: "7",
    name: "move",
    description: "Moves files and directories",
    payload: "move",
    options: [],
    parameters: [
      {
        name: "Source file or directory path",
        description: "The source file or directory",
      },
      {
        name: "Destination file or directory path",
        description: "The destination file or directory",
      },
    ],
  },
  {
    id: "8",
    name: "rename",
    description: "Renames a file or directory",
    payload: "rename",
    options: [],
    parameters: [
      {
        name: "Source file or directory path",
        description: "The source file or directory",
      },
      {
        name: "Destination file or directory path",
        description: "The destination file or directory",
      },
    ],
  },
  {
    id: "9",
    name: "cat",
    description: "Concatenates and displays files",
    payload: "cat",
    options: [],
    parameters: [
      {
        name: "File path",
        description: "The file to display",
      },
    ],
  },
  {
    id: "10",
    name: "chmod",
    description: "Changes file permissions",
    payload: "chmod",
    options: [],
    parameters: [
      {
        name: "File path",
        description: "The file to change permissions for",
      },
      {
        name: "Permissions",
        description: "The new permissions for the file",
      },
    ],
  },
  {
    id: "11",
    name: "chown",
    description: "Changes file owner and group",
    payload: "chown",
    options: [],
    parameters: [
      {
        name: "File path",
        description: "The file to change owner and group for",
      },
      {
        name: "Owner",
        description: "The new owner for the file",
      },
      {
        name: "Group",
        description: "The new group for the file",
      },
    ],
  },
  {
    id: "12",
    name: "pwd",
    description: "Prints the current working directory",
    payload: "pwd",
    options: [],
    parameters: [],
  },
];
