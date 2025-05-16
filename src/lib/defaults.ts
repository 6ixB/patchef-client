const defaults = {
  values: {
    codeEditor: "",
  },
  placeholders: {
    draggableView: {
      search: "Filter commands...",
      select: "Draggable",
    },
    command: {
      name: "Start Chrome",
      description: "Starts Google Chrome browser with Custom URL",
      type: "Select command type",
      payload: "start chrome",
      dataTable: {
        search: "Filter commands...",
      },
      parameter: {
        name: "Custom URL",
        description: "The URL to open in the browser",
      },
      option: {
        name: "Incognito mode",
        description: "Run the the browser in incognito mode",
        payload: "--incognito",
        delimiter: "Select a delimiter",
        parameter: {
          name: "Verbose Level",
          description: "The verbosity level of the command",
        },
      },
    },
    recipe: {
      listItem: {
        option: "Parameter payload",
        parameter: {
          search: "Search parameter...",
          payload: "Parameter payload",
        },
      },
      publish: {
        directoryName: "install-visual-studio-code",
        fileName: "script.bat",
      },
    },
  },
};

export { defaults };
