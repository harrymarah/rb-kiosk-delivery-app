import { Heart, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./SearchBar";
import { useProducts } from "./ProductSection";
import { useBasket } from "@/contexts/BasketContext";
import BasketDrawer from "./BasketDrawer";

const Header = () => {
  const { products } = useProducts();
  const { getTotalItems } = useBasket();
  
  // Flatten all products for search
  const allProducts = products ? [
    ...(products.shopNew || []),
    ...(products.breakfast || [])
  ] : [];

  const handleProductSelect = (product: any) => {
    console.log('Selected product:', product);
    // You can add navigation logic here
  };

  return (
    <header className="min-h-[200px] relative overflow-hidden bg-cover bg-center bg-no-repeat overflow-visible" style={{ backgroundImage: "url('/assets/breakfast-items.jpg')" }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-primary/80"></div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <SearchBar />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <Heart className="h-6 w-6" />
            </Button>
            <BasketDrawer>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 relative">
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </BasketDrawer>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-bold text-brand-yellow mb-4 tracking-wider">
            QuickMart
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;