import { ThemeProvider } from "@/components/providers/theme-provider";
import DndContextProvider from "@/components/providers/dnd-context-provider";
import {ReactNode} from "react";

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

export default Providers;
