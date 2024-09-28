import { defineStepper, type Stepper, type Step } from "@stepperize/react";
import { CreateCommandStepperStatus } from "@/components/sidebar/create-command-stepper/create-command-stepper-status";
import { CreateCommandStep1 } from "@/components/sidebar/create-command-stepper/create-command-step-1";
import { CreateCommandStep2 } from "@/components/sidebar/create-command-stepper/create-command-step-2";
import { CreateCommandStep3 } from "@/components/sidebar/create-command-stepper/create-command-step-3";
import { CreateCommandStep4 } from "@/components/sidebar/create-command-stepper/create-command-step-4";
import { CreateCommandStep5 } from "@/components/sidebar/create-command-stepper/create-command-step-5";

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

export interface CreateCommandStepProps {
  step: Step;
  hasPrev: boolean;
  hasNext: boolean;
  prev: () => void;
  next: () => void;
}

const CreateCommandStepper = () => {
  const stepper = useStepper();

  const createCommandStepProps = {
    hasPrev: !stepper.isFirst,
    hasNext: !stepper.isLast,
    prev: stepper.prev,
    next: stepper.next,
  };

  return (
    <div className="flex h-full w-full justify-between gap-x-10">
      <CreateCommandStepperStatus
        // TODO: Fix this type mismatch error, currently it's being casted as unknown
        stepper={stepper as unknown as Stepper<Step[]>}
      />
      {stepper.switch({
        "step-1": (step) => (
          <CreateCommandStep1 step={step} {...createCommandStepProps} />
        ),
        "step-2": (step) => (
          <CreateCommandStep2 step={step} {...createCommandStepProps} />
        ),
        "step-3": (step) => (
          <CreateCommandStep3 step={step} {...createCommandStepProps} />
        ),
        "step-4": (step) => (
          <CreateCommandStep4 step={step} {...createCommandStepProps} />
        ),
        "step-5": (step) => (
          <CreateCommandStep5 step={step} {...createCommandStepProps} />
        ),
      })}
    </div>
  );
};

export { CreateCommandStepper };
