import { TerminalIcon } from "lucide-react";
import CommandSearch from "@/components/commands/command-search";
import ManageButton from "./manage-button";

const SidebarHeader = () => {
  return (
    <div className="flex w-full flex-col gap-y-4 px-8 pt-4 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <TerminalIcon className="size-4" />
          <h1 className="font-medium">Commands</h1>
        </div>
        <ManageButton />
      </div>
      <CommandSearch />
    </div>
  );
};

export default SidebarHeader;
