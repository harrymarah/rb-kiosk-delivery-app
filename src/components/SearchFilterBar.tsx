import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SearchFilterBarProps {
  categories: string[];
  selectedCategory: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  resultCount: number;
}

const SearchFilterBar = ({
  categories,
  selectedCategory,
  sortBy,
  onCategoryChange,
  onSortChange,
  onClearFilters,
  resultCount,
}: SearchFilterBarProps) => {
  const hasActiveFilters = selectedCategory !== "all" || sortBy !== "relevance";

  return (
    <div className="bg-card border border-border rounded-lg p-3 mb-4">
      <div className="flex flex-col gap-3 items-stretch justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter & Sort</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              {hasActiveFilters ? "Active" : ""}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2 w-full">
          {/* Category Filter */}
          <div className="flex flex-1 min-w-0 items-center gap-1.5">
            <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full min-w-0">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Options */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="flex-1 min-w-0">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="name-asc">Name A-Z</SelectItem>
              <SelectItem value="name-desc">Name Z-A</SelectItem>
              <SelectItem value="price-low">Price Low-High</SelectItem>
              <SelectItem value="price-high">Price High-Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {/* Results count */}
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {resultCount} result{resultCount !== 1 ? 's' : ''}
          {selectedCategory !== "all" && (
            <span> in <strong>{selectedCategory}</strong></span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SearchFilterBar;