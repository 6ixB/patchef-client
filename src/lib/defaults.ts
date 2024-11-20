const defaults = {
  values: {
    codeEditor: "",
  },
  placeholders: {
    command: {
      name: "Start Chrome",
      description: "Starts Google Chrome browser with Custom URL",
      type: "Select command type",
      payload: "start chrome",
    },
    commandParameter: {
      name: "Custom URL",
      description: "The URL to open in the browser",
    },
    commandOption: {
      name: "Incognito mode",
      description: "Run the the browser in incognito mode",
      payload: "--incognito",
      delimiter: "Select a delimiter",
    },
    commandOptionParameter: {
      name: "Verbose Level",
      description: "The verbosity level of the command",
    },
  },
};

export { defaults };
