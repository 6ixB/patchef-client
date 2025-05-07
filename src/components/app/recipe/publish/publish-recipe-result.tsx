import { File, Folder, Tree } from "@/components/ui/file-tree";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { CopyIcon, PartyPopperIcon } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface RenderTreeContentProps {
  parts: string[];
}

const RenderTreeContentProps = ({ parts }: RenderTreeContentProps) => {
  if (parts.length === 1) {
    return (
      <File value={`${parts.length}`}>
        <p>{parts[0]}</p>
      </File>
    );
  }

  return (
    <Folder value={`${parts.length}`} element={parts[0]}>
      <RenderTreeContentProps parts={parts.slice(1, parts.length)} />
    </Folder>
  );
};

interface PublishRecipeResultProps {
  path: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PublishRecipeResult = ({
  path,
  open,
  setOpen,
}: PublishRecipeResultProps) => {
  // const parts = path.split("\\").filter(Boolean); For windows
  const parts = path.split("/").filter(Boolean); // For macOS and Linux (Since containers are based on Linux)

  const copyPathToClipboard = () => {
    toast.promise(navigator.clipboard.writeText(path), {
      loading: "Copying path to clipboard...",
      success: "Path copied to clipboard!",
      error: "Failed to copy path to clipboard.",
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <AlertDialogContent className="flex flex-col">
        <AlertDialogHeader>
          <div className="flex items-center gap-x-2">
            <PartyPopperIcon className="size-4" />
            <AlertDialogTitle>Congratulations!</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Your recipe has been published into the public remote repository at
            the following path:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Tree
          className="overflow-hidden rounded-md border bg-background p-4"
          initialSelectedId={`${parts.length}`}
          initialExpandedItems={parts.map((_, index) => `${index + 1}`)}
        >
          <RenderTreeContentProps parts={parts} />
        </Tree>
        <ScrollArea>
          <pre className="rounded-md border bg-background p-4">
            <code>{path}</code>
          </pre>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogAction onClick={copyPathToClipboard}>
            <CopyIcon className="mr-2 size-4" />
            Copy Path
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { PublishRecipeResult };
