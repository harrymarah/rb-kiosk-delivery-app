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
    <div className="border-b border-border px-8">
      <div className="container mx-auto">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "py-8 px-12 text-3xl font-medium border-b-4 transition-colors min-h-[100px] flex items-center",
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