import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useBasket } from "@/contexts/BasketContext";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/components/ProductSection";
import { isNewArrival } from "@/lib/product-utils";

const RedBullProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { addItem } = useBasket();
  const { toast } = useToast();
  const { allProducts } = useProducts();

  // Get the path where user came from, fallback to /quickmart
  const fromPath = location.state?.fromPath || '/quickmart';

  // Every Red Bull line in the catalogue, whichever categories it sits in.
  // This used to trawl a fixed list of category keys, which silently returned
  // nothing once the 2026 catalogue replaced that taxonomy.
  const getAllRedBullProducts = () => {
    if (!allProducts) return [];

    const products = allProducts.filter((product: any) =>
      product.name?.toLowerCase().includes('red bull')
    );

    // Remove duplicates with enhanced normalization for Red Bull products
    const normalize = (name: string) => {
      return name
        .toLowerCase()
        .replace(/drink/g, "")
        .replace(/energy/g, "")
        .replace(/red\s*bull/g, "rb")
        .replace(/(\d+)x(\d+ml)/g, "$2x$1") // normalize "8x250ml" to "250mlx8" 
        .replace(/(\d+ml)\s*x\s*(\d+)/g, "$1x$2") // normalize "250ml x 8" to "250mlx8"
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "");
    };
    
    const map = new Map<string, any>();
    for (const p of products) {
      const key = normalize(p.name);
      if (!map.has(key)) {
        map.set(key, p);
      }
    }
    const uniqueProducts = Array.from(map.values());

    return uniqueProducts;
  };

  const redBullProducts = getAllRedBullProducts();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const toggleFavoriteById = (productId: string) => {
    const product = redBullProducts.find(p => p.id === productId);
    if (product) {
      toggleFavorite(product);
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to basket",
      description: `${product.name} has been added to your basket`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(fromPath)}
              className="shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg font-bold leading-tight">Red Bull Products</h1>
              <p className="text-xs text-muted-foreground">
                Complete collection of Red Bull Energy Drinks
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-4">
        {redBullProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {redBullProducts.map((product) => (
               <ProductCard
                 key={product.id}
                 image={product.image}
                 name={product.name}
                 price={product.price}
                 offer={product.offer}
                 isFavorite={isFavorite(product.id)}
                 onToggleFavorite={() => toggleFavoriteById(product.id)}
                 onAddToCart={() => handleAddToCart(product)}
                 productId={product.id}
                 isNewArrival={isNewArrival(product)}
               />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Red Bull products found</h2>
            <p className="text-muted-foreground">
              Check back later for our Red Bull collection.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RedBullProducts;