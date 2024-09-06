import Providers from "@/components/providers/providers";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import {ReactNode} from "react";

export interface LayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <Providers>
      <div className="w-full h-dvh flex flex-col bg-background">
        <Header />
        <div className="flex w-full h-full overflow-y-hidden">
          <Sidebar />
          {children}
        </div>
      </div>
    </Providers>
  );
};

export default AppLayout;
