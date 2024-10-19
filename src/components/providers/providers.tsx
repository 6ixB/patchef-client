import { DndContextProvider } from "@/components/providers/dnd-context-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <DndContextProvider>{children}</DndContextProvider>
    </ThemeProvider>
  );
};

export { Providers };
