import { Heart, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./SearchBar";
import { useProducts } from "./ProductSection";
import { useBasket } from "@/contexts/BasketContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import BasketDrawer from "./BasketDrawer";
import FavoritesDrawer from "./FavoritesDrawer";
import heroBanner from "@/assets/hero-banner-long.png";

const Header = () => {
  const { products } = useProducts();
  const { getTotalItems } = useBasket();
  const { favorites } = useFavorites();
  
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
    <header className="min-h-[200px] relative overflow-hidden bg-cover bg-center bg-no-repeat overflow-visible" style={{ backgroundImage: `url(${heroBanner})` }}>
      {/* Subtle overlay for better button visibility */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 container mx-auto px-6 py-8 h-full flex flex-col justify-center">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <SearchBar />
          </div>
          
          <div className="flex items-center gap-4">
            <FavoritesDrawer>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 relative">
                <Heart className="h-6 w-6" />
                {favorites.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </FavoritesDrawer>
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

        <div className="text-center flex-1 flex items-center justify-center">
          <h1 className="text-5xl font-light text-brand-yellow mb-4 tracking-wider">
            QuickMart
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;