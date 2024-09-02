import CommandList from "@/components/commands/command-list";

const SidebarBody = () => {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto">
      <CommandList />
    </div>
  );
};

export default SidebarBody;
