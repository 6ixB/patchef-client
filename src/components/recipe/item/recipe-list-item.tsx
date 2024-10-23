import { RecipeListItemFillParamsButton } from "@/components/recipe/item/recipe-list-item-fill-params-button";
import { RecipeListItemPreviewButton } from "@/components/recipe/item/recipe-list-item-preview-button";
import { RecipeListItemRemoveButton } from "@/components/recipe/item/recipe-list-item-remove-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCommandStore } from "@/hooks/use-command-store";
import {
  checkAllEnabledOptionsParametersAreFilled,
  checkAllRequiredOptionParametersAreFilled,
  checkAllRequiredParametersAreFilled,
  formatOptionParameters,
} from "@/lib/utils";
import type { CommandEntity } from "@/types/commands/command.entity";
import { DndContextEventDataType } from "@/types/dnd-context";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import type { SortableTransition } from "@dnd-kit/sortable/dist/hooks/types";
import { CSS } from "@dnd-kit/utilities";
import { CommandIcon, TriangleAlertIcon } from "lucide-react";
import { useMemo } from "react";

function animateLayoutChanges(args: {
  active: Active | null;
  containerId: UniqueIdentifier;
  isDragging: boolean;
  isSorting: boolean;
  id: UniqueIdentifier;
  index: number;
  items: UniqueIdentifier[];
  previousItems: UniqueIdentifier[];
  previousContainerId: UniqueIdentifier;
  newIndex: number;
  transition: SortableTransition | null;
  wasDragging: boolean;
}) {
  const { isSorting, wasDragging } = args;

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
}

interface RecipeListItemProps {
  command: CommandEntity;
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
    animateLayoutChanges,
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
        className="h-20 select-none rounded-sm bg-gray-200 dark:bg-gray-800"
      />
    );
  }

  const isParametersAreFilled = checkAllRequiredParametersAreFilled(command);
  const isEnabledOptionParametersAreFilled =
    checkAllEnabledOptionsParametersAreFilled(command);

  const isNotParametersFilled =
    (command.parameters &&
      command.parameters.length !== 0 &&
      !isParametersAreFilled) ||
    !isEnabledOptionParametersAreFilled;

  return (
    <Card
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="flex cursor-grab select-none items-center justify-between rounded-sm px-4"
    >
      <div className="flex items-center">
        {/* Represents the Line Number */}
        <div className="flex h-8 w-8 items-center justify-center rounded border text-xs shadow">
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
            <div className="flex flex-wrap items-center gap-2">
              {!(command.parameters && command.options) && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-x-1"
                >
                  This command has no parameters or options
                </Badge>
              )}
              {isNotParametersFilled && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-x-1"
                >
                  <TriangleAlertIcon className="size-3 fill-orange-400 text-foreground dark:fill-orange-600" />
                  Parameters not yet filled!
                </Badge>
              )}
              {command.parameters &&
                command.parameters.length !== 0 &&
                command.parameters?.map(
                  (parameter) =>
                    parameter.payload &&
                    parameter.payload !== `[${parameter.name}]` && (
                      <Badge key={parameter.id}>
                        {parameter.name}: {parameter.payload}
                      </Badge>
                    ),
                )}
              {command.options &&
                command.options.length !== 0 &&
                command.options?.map(
                  (option) =>
                    option.payload &&
                    checkAllRequiredOptionParametersAreFilled(option) &&
                    option.enabled && (
                      <Badge key={option.id}>
                        {option.name}:&nbsp;
                        {option.parameterRequired
                          ? formatOptionParameters(option.parameters)
                          : "True"}
                      </Badge>
                    ),
                )}
            </div>
          </CardContent>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <RecipeListItemFillParamsButton
          command={command}
          commandIndex={index}
        />
        <RecipeListItemPreviewButton command={command} />
        <RecipeListItemRemoveButton command={command} />
      </div>
    </Card>
  );
};

export { type RecipeListItemProps, RecipeListItem };
