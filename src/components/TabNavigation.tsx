import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "explore", label: "Explore" },
  { id: "favourites", label: "Favourites" },
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="border-b border-border px-[clamp(1rem,2vw,4rem)]">
      <div className="container mx-auto">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "py-[clamp(1.5rem,3vw,4rem)] px-[clamp(2rem,3vw,5rem)] text-[clamp(1.5rem,3vw,3rem)] font-medium border-b-4 transition-colors min-h-[clamp(5rem,6vw,8rem)] flex items-center",
                activeTab === tab.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;