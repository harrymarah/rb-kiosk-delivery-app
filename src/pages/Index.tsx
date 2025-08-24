import { useState } from "react";
import Header from "@/components/Header";
import WelcomeSection from "@/components/WelcomeSection";
import TabNavigation from "@/components/TabNavigation";
import ProductSection, { useProducts } from "@/components/ProductSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const { products, categories } = useProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WelcomeSection />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === "explore" && products && (
        <div className="space-y-8">
          <ProductSection title="Shop new" products={products.shopNew} />
          <ProductSection title="Breakfast" products={products.breakfast} />
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
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Favourites</h2>
            <p className="text-muted-foreground">Save your favorite products here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
