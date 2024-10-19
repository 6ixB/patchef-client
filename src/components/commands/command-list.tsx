import { CommandListItem } from "@/components/commands/command-list-item";
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCommandStore } from "@/hooks/use-command-store";
import { DndContextEventDataType, DndContextNodeId } from "@/types/dnd-context";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useQuery } from "@tanstack/react-query";
import { fetchCommands } from "@/api/command.api";
import { RabbitIcon, ServerCrashIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { CommandListItemSkeleton } from "./command-list-item-skeleton";

const CommandList = () => {
  const { sourceCommands, setSourceCommands, setInitialSourceCommands } =
    useCommandStore();
  const sourceCommandIds = useMemo(
    () => sourceCommands.map((command) => command.id),
    [sourceCommands],
  );

  const { setNodeRef } = useDroppable({
    id: DndContextNodeId.SidebarSourceCommands,
    data: {
      type: DndContextEventDataType.SidebarSourceCommands,
    },
  });

  const { status, data } = useQuery({
    queryKey: ["get-commands"],
    queryFn: fetchCommands,
  });

  useEffect(() => {
    if (data) {
      /* We must set the source commands and the initial source commands to the fetched data. */
      setSourceCommands(data);
      setInitialSourceCommands(data);
    }
  }, [data, setSourceCommands, setInitialSourceCommands]);

  return (
    <ScrollArea ref={setNodeRef} className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-y-2 px-8 pb-4">
        {status === "success" ? (
          sourceCommands.length !== 0 ? (
            <SortableContext id="source-commands" items={sourceCommandIds}>
              {sourceCommands.map((command) => (
                <CommandListItem key={command.id} command={command} />
              ))}
            </SortableContext>
          ) : (
            <Card className="flex items-center gap-x-2 rounded-sm p-4">
              <RabbitIcon className="size-4" />
              <CardTitle className="text-sm">No commands exist yet</CardTitle>
            </Card>
          )
        ) : status === "pending" ? (
          Array.from({ length: 10 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: It's just a skeleton (-_-) - MY23-1
            <CommandListItemSkeleton key={index} />
          ))
        ) : (
          <Card className="flex items-center gap-x-2 rounded-sm p-4">
            <ServerCrashIcon className="size-4" />
            <CardTitle className="text-sm">
              Failed to fetch commands :(
            </CardTitle>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};

export { CommandList };
