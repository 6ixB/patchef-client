import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/* 
  Usage: this function is used to merge tailwind classes with classnames
*/
function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export { cn };
