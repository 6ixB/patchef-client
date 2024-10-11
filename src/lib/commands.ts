import { CommandType, type Command } from "@/types/command";

const commands: Command[] = [
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
  {
    id: "2",
    type: CommandType.Basic,
    name: "ls",
    description: "Lists the contents of a directory",
    payload: "ls",
    options: [],
    parameters: [
      {
        id: "2",
        name: "Directory path",
        description: "The directory to list the contents of",
        payload: "[Directory path]",
      },
    ],
  },
  {
    id: "3",
    type: CommandType.Basic,
    name: "cd",
    description: "Changes the current directory",
    payload: "cd",
    options: [],
    parameters: [
      {
        id: "3",
        name: "Directory path",
        description: "The directory to change to",
        payload: "[Directory path]",
      },
    ],
  },
  {
    id: "4",
    type: CommandType.Basic,
    name: "rm",
    description: "Removes a file or directory",
    payload: "rm",
    options: [
      {
        id: "4",
        name: "Recursive",
        description: "Recursively remove directories",
        payload: "-r",
        parameterRequired: false,
        parameters: [],
        enabled: false,
      },
    ],
    parameters: [
      {
        id: "4",
        name: "File or directory path",
        description: "The file or directory to remove",
        payload: "[File or directory path]",
      },
    ],
  },
  {
    id: "5",
    type: CommandType.Basic,
    name: "echo",
    description: "Displays a line of text",
    payload: "echo",
    options: [],
    parameters: [
      {
        id: "5",
        name: "Text",
        description: "The text to display",
        payload: "[Text]",
      },
    ],
  },
  {
    id: "6",
    type: CommandType.Basic,
    name: "xcopy",
    description: "Copies files and directories",
    payload: "xcopy",
    options: [
      {
        id: "6",
        name: "Recursive",
        description: "Recursively copy directories",
        payload: "/s",
        parameterRequired: false,
        delimiter: " ",
        parameters: [],
        enabled: false,
      },
    ],
    parameters: [
      {
        id: "7",
        name: "Source path",
        description: "The source file or directory",
        payload: "[Source path]",
      },
      {
        id: "8",
        name: "Destination path",
        description: "The destination file or directory",
        payload: "[Destination path]",
      },
    ],
  },
  {
    id: "7",
    type: CommandType.Basic,
    name: "move",
    description: "Moves files and directories",
    payload: "move",
    options: [],
    parameters: [
      {
        id: "9",
        name: "Source path",
        description: "The source file or directory",
        payload: "[Source path]",
      },
      {
        id: "10",
        name: "Destination path",
        description: "The destination file or directory",
        payload: "[Destination path]",
      },
    ],
  },
  {
    id: "8",
    type: CommandType.Basic,
    name: "rename",
    description: "Renames a file or directory",
    payload: "rename",
    options: [],
    parameters: [
      {
        id: "11",
        name: "Source path",
        description: "The source file or directory",
        payload: "[Source path]",
      },
      {
        id: "12",
        name: "Destination path",
        description: "The destination file or directory",
        payload: "[Destination path]",
      },
    ],
  },
  {
    id: "9",
    type: CommandType.Basic,
    name: "cat",
    description: "Concatenates and displays files",
    payload: "cat",
    options: [],
    parameters: [
      {
        id: "13",
        name: "File path",
        description: "The file to display",
        payload: "[File path]",
      },
    ],
  },
  {
    id: "10",
    type: CommandType.Basic,
    name: "chmod",
    description: "Changes file permissions",
    payload: "chmod",
    options: [],
    parameters: [
      {
        id: "14",
        name: "File path",
        description: "The file to change permissions for",
        payload: "[File path]",
      },
      {
        id: "15",
        name: "Permissions",
        description: "The new permissions for the file",
        payload: "[Permissions]",
      },
    ],
  },
  {
    id: "11",
    type: CommandType.Basic,
    name: "chown",
    description: "Changes file owner and group",
    payload: "chown",
    options: [],
    parameters: [
      {
        id: "16",
        name: "File path",
        description: "The file to change owner and group for",
        payload: "[File path]",
      },
      {
        id: "17",
        name: "Owner",
        description: "The new owner for the file",
        payload: "[Owner]",
      },
      {
        id: "18",
        name: "Group",
        description: "The new group for the file",
        payload: "[Group]",
      },
    ],
  },
  {
    id: "12",
    type: CommandType.Basic,
    name: "pwd",
    description: "Prints the current working directory",
    payload: "pwd",
  },
  {
    id: "13",
    type: CommandType.Basic,
    name: "scp",
    description: "Securely copies files between hosts over a network",
    payload: "scp",
    options: [
      {
        id: "19",
        name: "Port",
        description: "Specifies the port to connect to",
        payload: "-P",
        parameterRequired: true,
        parameters: [
          {
            id: "20",
            name: "Port number",
            description: "The port number to use for the connection",
            payload: "[Port number]",
          },
        ],
        enabled: false,
      },
    ],
    parameters: [
      {
        id: "21",
        name: "Source file path",
        description: "The path to the source file",
        payload: "[Source file path]",
      },
      {
        id: "22",
        name: "Destination",
        description: "The destination host and file path",
        payload: "[Destination]",
      },
    ],
  },
  {
    id: "14",
    type: CommandType.Basic,
    name: "7-Zip",
    description: "Extracts files from an archive using 7-Zip",
    payload: "'C:\\Program Files\\7-Zip\\7z.exe' x",
    options: [
      {
        id: "23",
        name: "Overwrite",
        description:
          "Automatically overwrites existing files without prompting",
        payload: "-y",
        parameterRequired: false,
        parameters: [],
        enabled: false,
      },
      {
        id: "24",
        name: "Output Directory",
        description: "Specifies the output directory for extracted files",
        payload: "-o",
        parameterRequired: true,
        delimiter: "",
        parameters: [
          {
            id: "25",
            name: "Destination path",
            description: "The path where extracted files should be placed",
            payload: "[Destination path]",
          },
        ],
        enabled: false,
      },
    ],
    parameters: [
      {
        id: "26",
        name: "Source path",
        description: "The path to the archive file to be extracted",
        payload: "[Source path]",
      },
    ],
  },
];

export { commands };
