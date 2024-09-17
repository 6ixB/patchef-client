import type { Command } from "@/types/command";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { DndContextEventDataType } from "@/types/dnd-context";
import { CommandIcon } from "lucide-react";

export interface CommandListItemProps {
  command: Command;
}

const CommandListItem = ({ command }: CommandListItemProps) => {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: command.id,
    data: {
      type: DndContextEventDataType.SOURCE_COMMAND,
      command,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="scale-100 cursor-grab select-none rounded-sm transition-all hover:scale-95"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-x-2">
          <CommandIcon className="size-4" />
          <CardTitle>{command.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p>{command.description}</p>
      </CardContent>
    </Card>
  );
};

export default CommandListItem;
