import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { SidebarBody } from "@/components/sidebar/sidebar-body";

const Sidebar = () => {
  return (
    <div className="flex h-full w-1/5 min-w-80 max-w-[36rem] flex-col overflow-y-hidden border-gray-200 border-r dark:border-gray-800">
      <SidebarHeader />
      <SidebarBody />
    </div>
  );
};

export { Sidebar };
