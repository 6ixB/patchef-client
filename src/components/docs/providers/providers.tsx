import { ThemeProvider } from "@/components/app/providers/theme-provider";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export { Providers };
