import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Video, 
  PlaySquare, 
  User, 
  Settings, 
  CreditCard 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Vídeos", url: "/videos", icon: Video },
  { title: "Séries", url: "/series", icon: PlaySquare },
  { title: "Conta", url: "/account", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-primary font-medium" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-display font-bold text-sidebar-foreground">StoryShort</h2>
                <p className="text-xs text-sidebar-foreground/70">IA Creator</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="flex-1 px-4 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClass}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 bg-sidebar border-t border-sidebar-border">
        {!isCollapsed ? (
          <div className="space-y-4">
            {/* Plan Status */}
            <Card className="bg-sidebar-accent/30 border-sidebar-border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-sidebar-foreground">Plano Pro</span>
                  <CreditCard className="w-4 h-4 text-sidebar-primary" />
                </div>
                <div className="text-xs text-sidebar-foreground/70">
                  <span className="font-medium text-sidebar-primary">847</span> créditos restantes
                </div>
                <div className="mt-2 h-1.5 bg-sidebar-border rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-sidebar-primary rounded-full"></div>
                </div>
              </CardContent>
            </Card>

            {/* Settings Button */}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
              asChild
            >
              <NavLink to="/settings">
                <Settings className="w-4 h-4 mr-3" />
                Configurações
              </NavLink>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Button variant="ghost" size="icon" asChild>
              <NavLink to="/settings">
                <Settings className="w-5 h-5 text-sidebar-foreground" />
              </NavLink>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}