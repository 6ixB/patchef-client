import type { Command } from "@/types/command";
import { Card, CardTitle } from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { DndContextEventDataType } from "@/types/dnd-context";
import { CommandIcon } from "lucide-react";
import { CommandListItemInfoButton } from "@/components/commands/command-list-item-info-button";

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
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="flex cursor-grab select-none items-center justify-between rounded-sm ps-4 pe-2 pt-4 pb-4"
    >
      <div className="flex items-center gap-x-2">
        <CommandIcon className="size-4" />
        <CardTitle className="text-sm">{command.name}</CardTitle>
      </div>
      <CommandListItemInfoButton command={command} />
    </Card>
  );
};

export { CommandListItem };
