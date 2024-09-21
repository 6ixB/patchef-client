import type { ColumnDef } from "@tanstack/react-table";
import type { Command } from "@/types/command";
import { Button } from "@/components/ui/button";
import { BoltIcon, CommandIcon, TrashIcon } from "lucide-react";

const columns: ColumnDef<Command>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const command = row.original;

      return (
        <div className="flex items-center gap-x-2">
          <CommandIcon className="size-4" />
          <span>{command.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex w-full justify-end gap-x-2">
          <Button variant="outline" size="icon">
            <BoltIcon className="size-4" />
          </Button>
          <Button variant="outline" size="icon">
            <TrashIcon className="size-4" />
          </Button>
        </div>
      );
    },
  },
];

export { columns };