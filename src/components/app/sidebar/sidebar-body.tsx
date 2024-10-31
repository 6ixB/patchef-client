import { CommandList } from "@/components/app/commands/command-list";
import { RecipeTemplateList } from "@/components/app/recipe/template/recipe-template-list";
import { DraggableView } from "@/components/app/sidebar/sidebar";

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
