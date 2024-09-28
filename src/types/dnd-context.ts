enum DndContextEventDataType {
  SidebarSourceCommands = "SIDEBAR_SOURCE_COMMANDS",
  RecipeAreaDropzone = "RECIPE_AREA_DROPZONE",
  SourceCommand = "SOURCE_COMMAND",
  DestinationCommand = "DESTINATION_COMMAND",
}

enum DndContextNodeId {
  SidebarSourceCommands = "sidebar-source-commands",
  RecipaAreaDropzone = "destination-commands-droppable",
}

export { DndContextEventDataType, DndContextNodeId };
