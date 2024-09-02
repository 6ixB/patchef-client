export interface CommandParameter {
  name: string;
  description: string;
}

export interface CommandOption {
  name: string;
  description: string;
  payload: string;
  parameterRequired: boolean;
  parameters?: CommandParameter[] | undefined;
}

export interface Command {
  id: string;
  name: string;
  description: string;
  payload: string;
  options: CommandOption[];
  parameters: CommandParameter[];
}
