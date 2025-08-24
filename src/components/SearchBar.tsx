import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  price: string;
  offer?: string;
  image: string;
  category: string;
}

interface SearchBarProps {
  products: Product[];
  onProductSelect?: (product: Product) => void;
}

const SearchBar = ({ products, onProductSelect }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6)); // Limit to 6 suggestions
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleProductSelect = (product: Product) => {
    setSearchTerm(product.name);
    setIsOpen(false);
    onProductSelect?.(product);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const openSearch = () => {
    setIsOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative">
      {!isOpen ? (
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-primary-foreground hover:bg-white/10"
          onClick={openSearch}
        >
          <Search className="h-6 w-6" />
        </Button>
      ) : (
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[300px]">
          <Search className="h-5 w-5 text-white/60 mr-2" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent border-none text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            autoFocus
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 text-white/60 hover:text-white ml-2"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductSelect(product)}
              className="w-full flex items-center gap-3 p-3 hover:bg-accent text-left transition-colors"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground">{product.name}</div>
                <div className="text-sm text-muted-foreground">
                  {product.price}
                  {product.offer && (
                    <span className="ml-2 text-success">• {product.offer}</span>
                  )}
                </div>
              </div>
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;