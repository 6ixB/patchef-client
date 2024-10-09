import { Providers } from "@/components/providers/providers";
import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Providers>
      <div className="flex h-dvh w-full flex-col scroll-smooth bg-background">
        <Header />
        <div className="flex h-full w-full overflow-y-hidden">
          <Sidebar />
          <div className="flex h-full w-full">{children}</div>
        </div>
      </div>
      <Toaster />
    </Providers>
  );
};

export { type AppLayoutProps, AppLayout };
