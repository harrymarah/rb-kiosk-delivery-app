import { Heart, User, ShoppingCart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./SearchBar";
import { useProducts } from "./ProductSection";
import { useBasket } from "@/contexts/BasketContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import BasketDrawer from "./BasketDrawer";
import FavoritesDrawer from "./FavoritesDrawer";
import heroBanner from "@/assets/hero-banner-long.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { products } = useProducts();
  const { getTotalItems } = useBasket();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  
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

      <div className="relative z-10 container mx-auto px-[clamp(1rem,2vw,4rem)] py-[clamp(2rem,3vw,6rem)] h-full flex flex-col justify-center">
        <div className="flex items-center justify-between mb-[clamp(1rem,2vw,3rem)]">
          <div className="flex items-center gap-[clamp(1rem,2vw,3rem)] flex-1">
            <SearchBar />
          </div>
          
          <div className="flex items-center gap-[clamp(1rem,2vw,3rem)]">
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-primary-foreground hover:bg-white/10"
              onClick={() => navigate('/')}
            >
              <Home className="h-[clamp(2rem,3vw,4rem)] w-[clamp(2rem,3vw,4rem)]" />
            </Button>
            <FavoritesDrawer>
              <Button variant="ghost" size="lg" className="text-primary-foreground hover:bg-white/10 relative">
                <Heart className="h-[clamp(2rem,3vw,4rem)] w-[clamp(2rem,3vw,4rem)]" />
                {favorites.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-[clamp(1.5rem,2vw,3rem)] w-[clamp(1.5rem,2vw,3rem)] p-0 flex items-center justify-center text-[clamp(0.875rem,1vw,1.25rem)] font-bold"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </FavoritesDrawer>
            <BasketDrawer>
              <Button variant="ghost" size="lg" className="text-primary-foreground hover:bg-white/10 relative">
                <ShoppingCart className="h-[clamp(2rem,3vw,4rem)] w-[clamp(2rem,3vw,4rem)]" />
                {getTotalItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-[clamp(1.5rem,2vw,3rem)] w-[clamp(1.5rem,2vw,3rem)] p-0 flex items-center justify-center text-[clamp(0.875rem,1vw,1.25rem)] font-bold"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </BasketDrawer>
          </div>
        </div>

        <div className="text-center flex-1 flex items-center justify-center">
          <div>
            <h1 className="text-[clamp(3rem,7vw,8rem)] font-light text-brand-yellow mb-2 tracking-wider">
              QuickMart
            </h1>
            <p className="text-[clamp(1.5rem,3vw,4rem)] font-light text-white tracking-wide">
              Earlham Street
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;