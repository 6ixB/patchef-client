import { ThemeProvider } from "@/components/providers/theme-provider";
import DndContextProvider from "./dnd-context-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <DndContextProvider>{children}</DndContextProvider>
    </ThemeProvider>
  );
};

export default Providers;
