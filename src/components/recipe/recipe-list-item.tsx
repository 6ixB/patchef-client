import type { Command } from "@/types/command";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DndContextEventDataType } from "@/types/dnd-context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CommandIcon, GripVerticalIcon, TriangleAlertIcon } from "lucide-react";
import { RecipeListItemRemoveButton } from "@/components/recipe/recipe-list-item-remove-button";
import { RecipeListItemFillParamsButton } from "@/components/recipe/recipe-list-item-fill-params-button";
import { RecipeListItemPreviewButton } from "@/components/recipe/recipe-list-item-preview-button";
import { useMemo } from "react";
import { useCommandStore } from "@/hooks/use-command-store";
import { Badge } from "@/components/ui/badge";

export interface RecipeListItemProps {
  command: Command;
}

const RecipeListItem = ({ command }: RecipeListItemProps) => {
  const { destinationCommands } = useCommandStore();

  const index = useMemo(() => {
    return destinationCommands.findIndex((c) => c.id === command.id);
  }, [destinationCommands, command.id]);

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
      type: DndContextEventDataType.DestinationCommand,
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
        className="h-28 select-none rounded-sm bg-gray-200 dark:bg-gray-800"
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="flex select-none items-center justify-between rounded-sm px-4"
    >
      <div className="flex items-center">
        <div className="flex min-h-8 min-w-8 items-center justify-center rounded border shadow">
          {index + 1}
        </div>
        <div>
          <CardHeader className="pt-4 pb-2">
            <div className="flex items-center gap-x-2">
              <CommandIcon className="size-4" />
              <CardTitle>{command.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pb-4">
            <p>{command.description}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="destructive"
                className="flex items-center gap-x-1"
              >
                <TriangleAlertIcon className="size-3 fill-orange-400 text-foreground dark:fill-orange-600" />
                Parameters and options not yet filled!
              </Badge>
              <Badge>Destination: /home/javiix/hello-world</Badge>
              <Badge>Verbose: False</Badge>
            </div>
          </CardContent>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <RecipeListItemFillParamsButton />
        <RecipeListItemPreviewButton command={command} />
        <RecipeListItemRemoveButton command={command} />
        <div
          {...attributes}
          {...listeners}
          className="flex cursor-grab items-center justify-center rounded p-2.5 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <GripVerticalIcon className="size-4" />
        </div>
      </div>
    </Card>
  );
};

export { RecipeListItem };
