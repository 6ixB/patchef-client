import { Terminal, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommandSearch from "@/components/commands/command-search";

const SidebarHeader = () => {
  return (
    <div className="w-full px-8 pt-4 pb-4 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Terminal className="size-4" />
          <h1 className="font-medium">Commands</h1>
        </div>
        <Button className="flex items-center justify-center gap-x-2">
          <Wrench className="size-4" />
          Manage
        </Button>
      </div>
      <CommandSearch />
    </div>
  );
};

export default SidebarHeader;
