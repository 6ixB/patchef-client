import type { Command } from "@/types/command";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { DndContextEventDataType } from "@/types/dnd-context";

export interface CommandListItemProps {
  command: Command;
}

const CommandListItem = ({ command }: CommandListItemProps) => {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: command.id,
    data: {
      type: DndContextEventDataType.COMMAND,
      command,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="rounded-sm scale-100 hover:scale-95 transition-all cursor-pointer"
    >
      <CardHeader className="pb-2">
        <CardTitle>{command.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{command.description}</p>
      </CardContent>
    </Card>
  );
};

export default CommandListItem;
