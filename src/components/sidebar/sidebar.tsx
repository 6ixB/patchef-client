import SidebarHeader from '@/components/sidebar/sidebar-header';
import SidebarBody from '@/components/sidebar/sidebar-body';

const Sidebar = () => {
  return (
    <div className="w-1/4 min-w-96 h-full flex flex-col overflow-y-hidden border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader />
      <SidebarBody />
    </div>
  );
};

export default Sidebar;
