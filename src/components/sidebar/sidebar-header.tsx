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
    <div className="flex w-full flex-col gap-y-4 px-8 pt-4 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Terminal className="size-4" />
          <h1 className="font-medium">Commands</h1>
        </div>
        <Dialog
          onOpenChange={() => {
            setIsManaging(!isManaging);
          }}
        >
          <DialogTrigger asChild={true}>
            <Button className="flex items-center justify-center gap-x-2">
              {isManaging ? (
                <Icons.spinner className="size-4 animate-spin" />
              ) : (
                <>
                  <Wrench className="size-4" />
                  Manage
                </>
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
