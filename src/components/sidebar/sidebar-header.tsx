import { Terminal, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommandSearch from '@/components/commands/command-search';
import { useCommandStore } from '@/hooks/use-command-store';
import { Icons } from '@/components/ui/icons';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ManageDialogContent from '@/components/sidebar/manage-dialog-content';

const SidebarHeader = () => {
  const { isManaging, setIsManaging } = useCommandStore();

  return (
    <div className="w-full px-8 pt-4 pb-4 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Terminal className="size-4" />
          <h1 className="font-medium">Commands</h1>
        </div>

        <Dialog
          onOpenChange={(open) => {
            setIsManaging(!isManaging);
          }}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center justify-center gap-x-2">
              {!isManaging ? (
                <>
                  <Wrench className="size-4" />
                  Manage
                </>
              ) : (
                <Icons.spinner className="animate-spin size-4" />
              )}
            </Button>
          </DialogTrigger>
          <ManageDialogContent />
        </Dialog>
      </div>
      <CommandSearch />
    </div>
  );
};

export default SidebarHeader;
