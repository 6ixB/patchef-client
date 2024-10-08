import { defineStepper, type Stepper, type Step } from "@stepperize/react";
import { EditCommandStepperStatus } from "@/components/sidebar/edit-command-stepper/edit-command-stepper-status";
import { EditCommandStep2 } from "@/components/sidebar/edit-command-stepper/edit-command-step-2";
import { EditCommandStep3 } from "@/components/sidebar/edit-command-stepper/edit-command-step-3";
import { EditCommandStep4 } from "@/components/sidebar/edit-command-stepper/edit-command-step-4";
import { EditCommandStep5 } from "@/components/sidebar/edit-command-stepper/edit-command-step-5";
import { EditCommandStep1 } from "@/components/sidebar/edit-command-stepper/edit-command-step-1";

const { useStepper } = defineStepper(
  {
    id: "step-1",
    title: "1",
    description: "Set your command name, description, and payload",
  },
  {
    id: "step-2",
    title: "2",
    description: "Set your command parameters (optional)",
  },
  {
    id: "step-3",
    title: "3",
    description: "Set your command options and its payload (optional)",
  },
  {
    id: "step-4",
    title: "4",
    description: "Set your command options parameters (optional)",
  },
  { id: "step-5", title: "5", description: "Preview your command" },
);

export interface EditCommandStepProps {
  step: Step;
  hasPrev: boolean;
  hasNext: boolean;
  prev: () => void;
  next: () => void;
}

const EditCommandStepper = () => {
  const stepper = useStepper();

  const editCommandStepProps = {
    hasPrev: !stepper.isFirst,
    hasNext: !stepper.isLast,
    prev: stepper.prev,
    next: stepper.next,
  };

  return (
    <div className="flex h-full w-full justify-between gap-x-10">
      <EditCommandStepperStatus
        // TODO: Fix this type mismatch error, currently it's being casted as unknown
        stepper={stepper as unknown as Stepper<Step[]>}
      />
      {stepper.switch({
        "step-1": (step) => (
          <EditCommandStep1 step={step} {...editCommandStepProps} />
        ),
        "step-2": (step) => (
          <EditCommandStep2 step={step} {...editCommandStepProps} />
        ),
        "step-3": (step) => (
          <EditCommandStep3 step={step} {...editCommandStepProps} />
        ),
        "step-4": (step) => (
          <EditCommandStep4 step={step} {...editCommandStepProps} />
        ),
        "step-5": (step) => (
          <EditCommandStep5 step={step} {...editCommandStepProps} />
        ),
      })}
    </div>
  );
};

export { EditCommandStepper };
