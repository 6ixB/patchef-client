import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { DndContextProvider } from "@/components/providers/dnd-context-provider";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <DndContextProvider>{children}</DndContextProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export { Providers };
