import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useBasket } from "@/contexts/BasketContext";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/components/ProductSection";
import { isShopNewProduct } from "@/lib/product-utils";

const RedBullProducts = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { addItem } = useBasket();
  const { toast } = useToast();
  const { products: productsData } = useProducts();

  // Get all Red Bull products from various categories
  const getAllRedBullProducts = () => {
    if (!productsData) return [];

    const allProducts = [
      ...(productsData.redBull || []),
      ...(productsData.energyDrinks || []).filter(product => 
        product.name.toLowerCase().includes('red bull')
      ),
      ...(productsData.softDrinks || []).filter(product => 
        product.name.toLowerCase().includes('red bull')
      ),
      ...(productsData.matchReady || []).filter(product => 
        product.name.toLowerCase().includes('red bull')
      ),
      ...(productsData.favourites || []).filter(product => 
        product.name.toLowerCase().includes('red bull')
      ),
      ...(productsData.shopNew || []).filter(product => 
        product.name.toLowerCase().includes('red bull')
      ),
      ...(productsData.beverages || []).filter(product => 
        product.name.toLowerCase().includes('red bull')
      ),
    ];

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
    for (const p of allProducts) {
      const key = normalize(p.name);
      const existing = map.get(key);
      if (!existing || (p.category === 'redBull' && existing.category !== 'redBull')) {
        map.set(key, p);
      }
    }
    const uniqueProducts = Array.from(map.values());

    return uniqueProducts;
  };

  const redBullProducts = getAllRedBullProducts();

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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/quickmart')}
              className="shrink-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Red Bull Products</h1>
              <p className="text-muted-foreground">
                Complete collection of Red Bull energy drinks
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-6">
        {redBullProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                 isNewArrival={isShopNewProduct(product.id)}
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