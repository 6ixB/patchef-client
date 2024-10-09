import { CommandList } from "@/components/commands/command-list";
import { DraggableView } from "@/components/sidebar/sidebar";
import { RecipeTemplateList } from "@/components/recipe/template/recipe-template-list";

interface SidebarBodyProps {
  draggableView: DraggableView;
  setDraggableView: (draggable: DraggableView) => void;
}

const renderDraggableView = (draggableView: DraggableView) => {
  switch (draggableView) {
    case DraggableView.Commands:
      return <CommandList />;
    case DraggableView.Recipes:
      return <RecipeTemplateList />;
    default:
      return null;
  }
};

const SidebarBody = ({ draggableView }: SidebarBodyProps) => {
  return (
    <div className="h-full w-full overflow-y-hidden">
      {renderDraggableView(draggableView)}
    </div>
  );
};

export { type SidebarBodyProps, SidebarBody };
