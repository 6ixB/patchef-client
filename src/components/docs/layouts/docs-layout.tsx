import { Providers } from "@/components/docs/providers/providers";
import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

interface DocsLayoutProps {
  children: ReactNode;
}

const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <Providers>
      {children}
      <Toaster richColors={true} />
    </Providers>
  );
};

export { type DocsLayoutProps, DocsLayout };
