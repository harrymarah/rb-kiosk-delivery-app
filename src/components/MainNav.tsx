import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", icon: "🏠", path: "/" },
  { id: "discover", label: "Discover", icon: "🔍", path: "/discover" },
  { id: "restaurants", label: "Restaurants", icon: "🍽️" },
  { id: "groceries", label: "Groceries", icon: "🛒" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "reservations", label: "Reservations", icon: "📅", path: "/reservations", badge: "NEW" },
];

interface MainNavProps {
  /** id of the item to highlight, e.g. "home" */
  activeItem: string;
  className?: string;
}

const MainNav = ({ activeItem, className }: MainNavProps) => {
  const navigate = useNavigate();

  return (
    <nav className={cn("bg-background border-b px-1 pt-0.5 pb-2", className)}>
      {/* overflow-x-auto also clips vertically, so the scroll box carries the
         top padding the "NEW" badge overhangs into. */}
      <div className="flex justify-around overflow-x-auto no-scrollbar pt-1.5">
        {navItems.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <div
              key={item.id}
              className={cn(
                "text-center px-1 shrink-0",
                item.path && !isActive && "cursor-pointer"
              )}
              onClick={() => {
                if (item.path && !isActive) navigate(item.path);
              }}
            >
              <div className="relative inline-block">
                <div className={cn("main-nav-icon mb-0.5 leading-none", isActive ? "text-primary" : "text-muted-foreground")}>
                  {item.icon}
                </div>
                {item.badge && (
                  <span className="main-nav-badge absolute -top-1 -right-2 rounded-full bg-destructive px-1 font-bold leading-tight text-destructive-foreground">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "main-nav-label block leading-tight whitespace-nowrap",
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default MainNav;
