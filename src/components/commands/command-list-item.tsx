import type { Command } from "@/types/command";
import { Card, CardTitle } from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { DndContextEventDataType } from "@/types/dnd-context";
import { CommandIcon, GripVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandListItemInfoDialog } from "@/components/commands/command-list-item-info-dialog";

export interface CommandListItemProps {
  command: Command;
}

const CommandListItem = ({ command }: CommandListItemProps) => {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: command.id,
    data: {
      type: DndContextEventDataType.SourceCommand,
      command,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      className="flex select-none items-center justify-between rounded-sm ps-4 pe-2 pt-4 pb-4 transition-all"
    >
      <div className="flex items-center gap-x-2">
        <CommandIcon className="size-4" />
        <CardTitle className="text-sm">{command.name}</CardTitle>
      </div>
      <div className="flex items-center">
        <CommandListItemInfoDialog command={command} />
        <Button
          {...attributes}
          {...listeners}
          variant="ghost"
          className="cursor-grab rounded p-2.5 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <GripVerticalIcon className="size-4" />
        </Button>
      </div>
    </Card>
  );
};

export { CommandListItem };
