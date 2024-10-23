import { Header } from "@/components/header/header";
import { Providers } from "@/components/providers/providers";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

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
      <Toaster richColors={true} />
    </Providers>
  );
};

export { type AppLayoutProps, AppLayout };
