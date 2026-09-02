import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import WelcomeSection from "@/components/WelcomeSection";
import TabNavigation from "@/components/TabNavigation";
import ProductSection, { useProducts } from "@/components/ProductSection";
import ProductCarousel from "@/components/ProductCarousel";
import ProductCard from "@/components/ProductCard";
import BannerAd from "@/components/BannerAd";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useBasket } from "@/contexts/BasketContext";
import { useToast } from "@/hooks/use-toast";
import { isNewArrival } from "@/lib/product-utils";
import { getCategoryIcon } from "@/lib/categories";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { favorites: favItems, toggleFavorite: toggleFav, isFavorite } = useFavorites();
  const { addItem } = useBasket();
  const { toast } = useToast();
  const { products, categories, allProducts } = useProducts();
  const favoritesSet = new Set(favItems.map(f => f.id));

  // Handle URL params for category selection
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const tabParam = searchParams.get("tab");
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const toggleFavoriteById = (productId: string) => {
    const product = allProducts?.find(p => p.id === productId);
    if (!product) return;
    toggleFav({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
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

  const categoryProducts = selectedCategory 
    ? allProducts?.filter(product => product.categories?.includes(selectedCategory)) || []
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WelcomeSection />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === "explore" && !selectedCategory && products && (
        <div className="space-y-8">
          {categories.map((cat) => {
            const items = products[cat.id] || [];
            if (items.length === 0) return null;
            return (
              <ProductCarousel
                key={cat.id}
                title={cat.name}
                icon={getCategoryIcon(cat.id)}
                products={items.slice(0, 6)}
                favorites={favoritesSet}
                onToggleFavorite={toggleFavoriteById}
                onSeeAll={items.length > 6 ? () => setSelectedCategory(cat.id) : undefined}
              />
            );
          })}

          {/* Bottom Banner Advertisement */}
          <div className="px-6">
            <div className="container mx-auto max-w-4xl">
              <BannerAd 
                title="Join Our Loyalty Program" 
                subtitle="Earn points with every purchase and get exclusive member discounts"
                className="my-8"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "explore" && selectedCategory && (
        <div>
          <div className="px-6 py-6">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  ← Back to explore
                </button>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-6 capitalize">
                {categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}
              </h2>
              
              
              {/* Products Grid First */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                 {categoryProducts.map((product) => (
                   <ProductCard
                     key={product.id}
                     image={product.image}
                     name={product.name}
                     price={product.price}
                     originalPrice={product.originalPrice}
                     offer={product.offer}
                     isFavorite={favoritesSet.has(product.id)}
                     onToggleFavorite={() => toggleFavoriteById(product.id)}
                      onAddToCart={() => handleAddToCart(product)}
                     productId={product.id}
                     isNewArrival={isNewArrival(product)}
                   />
                 ))}
              </div>
              
            </div>
          </div>
        </div>
      )}
      
      
      {activeTab === "favourites" && (
        <div className="px-4 py-5">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xl font-bold text-foreground mb-4 text-center">Your Favourites</h2>
            {favItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                 {favItems.map((product) => (
                   <ProductCard
                     key={product.id}
                     image={product.image}
                     name={product.name}
                     price={product.price}
                     isFavorite={true}
                     onToggleFavorite={() => toggleFav(product)}
                     onAddToCart={() => handleAddToCart(product)}
                     productId={product.id}
                     isNewArrival={isNewArrival(product)}
                   />
                 ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground">No favorite products yet</p>
                <p className="text-sm text-muted-foreground mt-2">Click the heart icon on products to add them to your favorites</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
