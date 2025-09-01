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

const Index = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { favorites: favItems, toggleFavorite: toggleFav, isFavorite } = useFavorites();
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
          <ProductCarousel 
            title="Shop new" 
            products={products.shopNew} 
            favorites={favoritesSet}
            onToggleFavorite={toggleFavoriteById}
          />
          
          <ProductCarousel
            title="Breakfast" 
            products={products.breakfast?.slice(0, 6)} 
            favorites={favoritesSet}
            onToggleFavorite={toggleFavoriteById}
          />
          
          <ProductCarousel 
            title="Get Match Ready" 
            products={products.matchReady?.slice(0, 6)} 
            favorites={favoritesSet}
            onToggleFavorite={toggleFavoriteById}
          />
          
          <ProductCarousel 
            title="Soft Drinks" 
            products={products.softDrinks?.slice(0, 6)} 
            favorites={favoritesSet}
            onToggleFavorite={toggleFavoriteById}
          />
          
          <div className="px-6 py-6">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Energy Drinks</h2>
                <button
                  onClick={() => setSelectedCategory("energyDrinks")}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  See All →
                </button>
              </div>
              <div className="-mx-6">
                <ProductCarousel 
                  title="" 
                  products={products.energyDrinks?.slice(0, 6)} 
                  favorites={favoritesSet}
                  onToggleFavorite={toggleFavoriteById}
                />
              </div>
            </div>
          </div>
          
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
                {selectedCategory === "energyDrinks" ? "Energy Drinks" : selectedCategory}
              </h2>
              
              {/* Energy Drinks Category - Add Advert Block */}
              {selectedCategory === "energyDrinks" && (
                <div className="mb-8">
                  <BannerAd 
                    title="Red Bull Energy Drinks" 
                    subtitle="Discover the full range of Red Bull products"
                    className="my-6"
                  />
                </div>
              )}
              
              {/* Energy Drinks Category - Featured Products Carousel */}
              {selectedCategory === "energyDrinks" && (
                <div className="mb-8">
                  <ProductCarousel 
                    title="Featured Red Bull Products" 
                    products={[
                      {
                        id: "energy2",
                        name: "Red Bull Sugar Free Energy Drink 250ml",
                        price: "£2.49",
                        image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/products/Red%20Bull%20Products/ALL/18%20-%20Red%20Bull%20Sugar%20Free%20Energy%20Drink%20250ml%20.png"
                      },
                      {
                        id: "energy4",
                        name: "Red Bull Sugar Free Energy Drink 250ml x4",
                        price: "£7.99",
                        image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/products/Categories/6%20Energy%20Drinks/4%20-%20Red%20Bull%20Sugar%20Free%20Energy%20Drink%20250ml%20x4.jpeg"
                      },
                      {
                        id: "rb11",
                        name: "Red Bull Winter Edition Sugar Free Energy Drink 250ml x 4",
                        price: "£7.99",
                        image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/products/Red%20Bull%20Products/ALL/11%20-%20Red%20Bull%20Winter%20Edition%20Sugar%20Free%20Energy%20Drink%20250ml%20x%204.jpg"
                      },
                      {
                        id: "new1",
                        name: "Red Bull Lilac Edition Sugar Free Energy Drink 4x250ml",
                        price: "£9.99",
                        image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/products/Categories/12%20New%20Products/Image%201%20-%20Red%20Bull%20Lilac%20Edition%20Sugar%20Free%20Energy%20Drink%204x250ml.jpg"
                      }
                    ]}
                    favorites={favoritesSet}
                    onToggleFavorite={toggleFavoriteById}
                  />
                </div>
              )}
              
              <div className="grid grid-cols-4 gap-6">
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
                    onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                    productId={product.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      
      {activeTab === "favourites" && (
        <div className="px-6 py-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Your Favourites</h2>
            {favItems.length > 0 ? (
              <div className="grid grid-cols-4 gap-6">
                {favItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFav(product)}
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
