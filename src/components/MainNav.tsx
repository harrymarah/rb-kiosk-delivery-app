import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", icon: "🏠", path: "/" },
  { id: "discover", label: "Discover", icon: "🔍", path: "/discover" },
  { id: "restaurants", label: "Restaurants", icon: "🍽️" },
  { id: "groceries", label: "Groceries", icon: "🛒" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "reservations", label: "Reservations", icon: "📅", path: "/reservations" },
];

interface MainNavProps {
  /** id of the item to highlight, e.g. "home" */
  activeItem: string;
  className?: string;
}

const MainNav = ({ activeItem, className }: MainNavProps) => {
  const navigate = useNavigate();

  return (
    <nav className={cn("bg-background border-b px-1 py-2", className)}>
      <div className="flex justify-around overflow-x-auto no-scrollbar">
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
              <div className={cn("main-nav-icon mb-0.5 leading-none", isActive ? "text-primary" : "text-muted-foreground")}>
                {item.icon}
              </div>
              <span
                className={cn(
                  "main-nav-label leading-tight whitespace-nowrap",
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
