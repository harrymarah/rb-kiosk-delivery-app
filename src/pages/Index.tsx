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
      
      {activeTab === "categories" && (
        <div className="px-6 py-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Categories</h2>
            <p className="text-muted-foreground">Browse products by category</p>
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
