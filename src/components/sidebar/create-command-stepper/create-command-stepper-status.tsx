import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCommandStore } from "@/hooks/use-command-store";
import { checkAllRequiredOptionParametersAreFilled, cn } from "@/lib/utils";
import type { Step, Stepper } from "@stepperize/react";
import { toast } from "sonner";

export interface CreateCommandStepperStatusProps {
  stepper: Stepper<Step[]>;
}

const CreateCommandStepperStatus = ({
  stepper,
}: CreateCommandStepperStatusProps) => {
  const { draftCommand } = useCommandStore();

  const handleStepClick = (step: Step) => {
    // Check if the draft command is empty
    if (!draftCommand) {
      toast.error("Please fill out the required fields first.");
      return;
    }

    // Check if the current step is less than the clicked step
    if (stepper.current.id.localeCompare(step.id) < 0) {
      // Check if the current step is step-4 and all required option parameters are filled
      if (
        stepper.current.id === "step-4" &&
        !checkAllRequiredOptionParametersAreFilled(draftCommand)
      ) {
        toast.error(
          "Please fill out the required fields for the current step first."
        );
        return;
      }
    }

    stepper.goTo(step.id);
  };

  return (
    <Card className="flex flex-col justify-center gap-y-2 rounded-md p-8">
      {stepper.all.map((step, index) => (
        <div key={step.id} className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-4">
            {/* TODO: Add onKeyUp to complement onClick event */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: I have no idea what to put here to be honest - MY23-1  */}
            <div
              onClick={() => handleStepClick(step)}
              className={cn(
                "flex size-8 min-h-8 min-w-8 flex-col items-center justify-center rounded-full border text-xs",
                stepper.current.id === step.id &&
                  "border-none bg-primary font-black text-primary-foreground",
                stepper.current.id !== step.id &&
                  "cursor-pointer hover:ring-2 hover:ring-primary"
              )}
            >
              {step.title}
              {stepper.current.id === step.id && (
                <span className="absolute size-8 animate-ping rounded-full bg-inherit opacity-50" />
              )}
            </div>
            <span className="max-w-[8rem] text-muted-foreground text-xs">
              {step.description}
            </span>
          </div>
          {/* Only render separators in between */}
          {index < stepper.all.length - 1 && (
            <Separator orientation="vertical" className="ms-4 h-12" />
          )}
        </div>
      ))}
    </Card>
  );
};

export { CreateCommandStepperStatus };
