import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadIcon } from "lucide-react";
import { FileUpload } from "@/components/app/sidebar/command-data-table/file-upload";
import { useState } from "react";

const ImportCommandsButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogTrigger asChild={true}>
        <Button variant="secondary">
          <UploadIcon className="mr-2 size-4" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <div className="flex items-center gap-x-2">
            <UploadIcon className="size-4" />
            <DialogTitle>Import commands</DialogTitle>
          </div>
          <DialogDescription>
            The only file upload you will ever need
          </DialogDescription>
        </DialogHeader>
        <FileUpload open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export { ImportCommandsButton };
