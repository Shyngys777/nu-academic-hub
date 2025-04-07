
import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarDays, BookOpen, FolderOpen, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Exam Schedule", path: "/exams", icon: CalendarDays },
    { name: "Study Planner", path: "/planner", icon: BookOpen },
    { name: "Materials", path: "/materials", icon: FolderOpen },
  ];

  if (!isOpen) return null;

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16 transition-all duration-300 shadow-md",
      isOpen ? "translate-x-0" : "-translate-x-full",
    )}>
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4" 
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      )}

      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-nu-blue mb-6">NU Academic Hub</h2>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              onClick={() => isMobile && setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-all",
                isActive 
                  ? "text-white bg-nu-blue font-medium" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <Separator className="my-6" />
        
        <nav className="space-y-1">
          <NavLink 
            to="/settings"
            onClick={() => isMobile && setIsOpen(false)}
            className={({ isActive }) => cn(
              "flex items-center px-3 py-2 text-sm rounded-md transition-all",
              isActive 
                ? "text-white bg-nu-blue font-medium" 
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
