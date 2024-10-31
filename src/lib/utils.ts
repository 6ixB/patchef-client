import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PointerEvent } from "react";
import { PointerSensor } from "@dnd-kit/core";

/* 
  Usage: this function is used to merge tailwind classes with classnames
*/
function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/*
 An extended "PointerSensor" that prevent some
 interactive html element(button, input, textarea, select, option...) from dragging

 Source: https://github.com/clauderic/dnd-kit/issues/477#issuecomment-949425868
*/
// biome-ignore lint/complexity/noStaticOnlyClass: See above github issue
// biome-ignore lint/correctness/noUnusedVariables: See above github issue
class SmartPointerSensor extends PointerSensor {
  static activators = [
    {
      // biome-ignore lint/suspicious/noExplicitAny: See above github issue
      eventName: "onPointerDown" as any,
      handler: ({ nativeEvent: event }: PointerEvent) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target as Element)
        ) {
          return false;
        }

        return true;
      },
    },
  ];
}

function isInteractiveElement(element: Element | null) {
  const interactiveElements = [
    "button",
    "input",
    "textarea",
    "select",
    "option",
  ];
  if (
    element?.tagName &&
    interactiveElements.includes(element.tagName.toLowerCase())
  ) {
    return true;
  }

  return false;
}

export { cn, SmartPointerSensor };
