import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import WelcomeSection from "@/components/WelcomeSection";
import TabNavigation from "@/components/TabNavigation";
import ProductSection, { useProducts } from "@/components/ProductSection";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { products, categories, allProducts } = useProducts();

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

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const favoriteProducts = allProducts?.filter(product => favorites.has(product.id)) || [];
  const categoryProducts = selectedCategory 
    ? allProducts?.filter(product => product.category === selectedCategory) || []
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WelcomeSection />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === "explore" && !selectedCategory && products && (
        <div className="space-y-8">
          <ProductSection 
            title="Shop new" 
            products={products.shopNew} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
          <ProductSection 
            title="Breakfast" 
            products={products.breakfast} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      )}

      {activeTab === "explore" && selectedCategory && (
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
            <h2 className="text-2xl font-bold text-foreground mb-6 capitalize">{selectedCategory}</h2>
            <div className="grid grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  offer={product.offer}
                  isFavorite={favorites.has(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                  productId={product.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === "categories" && categories && (
        <div className="px-6 py-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Browse Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(category.name.toLowerCase());
                    setActiveTab("explore");
                  }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === "favourites" && (
        <div className="px-6 py-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Your Favourites</h2>
            {favoriteProducts.length > 0 ? (
              <div className="grid grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    offer={product.offer}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(product.id)}
                    onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                    productId={product.id}
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
