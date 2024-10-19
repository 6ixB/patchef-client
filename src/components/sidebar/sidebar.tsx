import { SidebarBody } from "@/components/sidebar/sidebar-body";
import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { useState } from "react";

enum DraggableView {
  Commands = "commands",
  Recipes = "recipes",
}

const Sidebar = () => {
  const [draggableView, setDraggableView] = useState<DraggableView>(
    DraggableView.Commands,
  );

  return (
    <div className="flex h-full w-1/5 min-w-[21rem] max-w-[36rem] flex-col overflow-y-hidden border-gray-200 border-r dark:border-gray-800">
      <SidebarHeader
        draggableView={draggableView}
        setDraggableView={setDraggableView}
      />
      <SidebarBody
        draggableView={draggableView}
        setDraggableView={setDraggableView}
      />
    </div>
  );
};

export { Sidebar, DraggableView };
