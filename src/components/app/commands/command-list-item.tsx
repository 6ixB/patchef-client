import { CommandListItemInfoButton } from "@/components/app/commands/command-list-item-info-button";
import { Card, CardTitle } from "@/components/ui/card";
import type { CommandEntity } from "@/types/commands/command.entity";
import { DndContextEventDataType } from "@/types/dnd-context";
import { useDraggable } from "@dnd-kit/core";
import { CommandIcon } from "lucide-react";
import { useState } from "react";

interface CommandListItemProps {
  command: CommandEntity;
}

const CommandListItem = ({ command }: CommandListItemProps) => {
  const [disabled, setDisabled] = useState(false);

  const { setNodeRef, attributes, listeners } = useDraggable({
    id: command.id,
    data: {
      type: DndContextEventDataType.SourceCommand,
      command,
    },
    disabled,
  });

  return (
    <Card
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="flex cursor-grab select-none items-center justify-between rounded-sm ps-4 pe-2 pt-4 pb-4"
    >
      <div className="flex items-center gap-x-2">
        <CommandIcon className="size-4 min-h-4 min-w-4" />
        <CardTitle className="text-sm">{command.name}</CardTitle>
      </div>
      <CommandListItemInfoButton command={command} setDisabled={setDisabled} />
    </Card>
  );
};

export { type CommandListItemProps, CommandListItem };
