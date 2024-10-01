import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BoltIcon } from "lucide-react";

const CreateCommandOptionsPlaygroundDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant="outline" className="w-[11.5rem]">
          <BoltIcon className="mr-2 size-4" />
          Configure options
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure enabled options</DialogTitle>
          <DialogDescription>
            Still in development. Stay tuned!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { CreateCommandOptionsPlaygroundDialog };
