import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header with mobile trigger */}
          <header className="h-16 border-b border-border bg-card px-6 flex items-center lg:hidden">
            <SidebarTrigger asChild>
              <Button variant="ghost" size="icon">
                <div>
                  <Menu className="w-5 h-5" />
                </div>
              </Button>
            </SidebarTrigger>
          </header>

          {/* Main content */}
          <div className="flex-1 p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}