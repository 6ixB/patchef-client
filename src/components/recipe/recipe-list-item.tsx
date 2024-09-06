import type { Command } from "@/types/command";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DndContextEventDataType } from "@/types/dnd-context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export interface RecipeListItemProps {
  command: Command;
}

const RecipeListItem = ({ command }: RecipeListItemProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: command.id,
    data: {
      type: DndContextEventDataType.DESTINATION_COMMAND,
      command,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="select-none rounded-sm bg-gray-200 dark:bg-gray-900"
      >
        <CardHeader className="pb-2">
          <CardTitle className="opacity-0">{command.name}</CardTitle>
        </CardHeader>
        <CardContent className="opacity-0">
          <p>{command.description}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="select-none rounded-sm flex items-center justify-between pe-4"
    >
      <div>
        <CardHeader className="pb-2">
          <CardTitle>{command.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{command.description}</p>
        </CardContent>
      </div>
      <div
        {...attributes}
        {...listeners}
        className={
          "flex justify-center items-center p-2 rounded cursor-grab hover:bg-gray-200 dark:hover:bg-gray-800"
        }
      >
        <GripVertical size={20} className={"text-navy"} />
      </div>
    </Card>
  );
};

export default RecipeListItem;
