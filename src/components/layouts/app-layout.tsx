import Providers from "@/components/providers/providers";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import type { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <Providers>
      <div className="flex h-dvh w-full flex-col scroll-smooth bg-background">
        <Header />
        <div className="flex h-full w-full overflow-y-hidden">
          <Sidebar />
          <div className="flex h-full w-full">{children}</div>
        </div>
      </div>
    </Providers>
  );
};

export default AppLayout;