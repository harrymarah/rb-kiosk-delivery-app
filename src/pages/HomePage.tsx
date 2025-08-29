import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BannerAd from "@/components/BannerAd";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const supermarkets = [
    {
      id: "quickmart",
      name: "QuickMart",
      logo: "🛒",
      bgColor: "bg-blue-500",
      deliveryTime: "15 min",
      functional: true
    },
    {
      id: "waitrose",
      name: "WaitRose & P...",
      logo: "🌿",
      bgColor: "bg-green-500",
      deliveryTime: "20 min",
      functional: false
    },
    {
      id: "sainsbury",
      name: "SainsBury's",
      logo: "🧡",
      bgColor: "bg-orange-500",
      deliveryTime: "18 min",
      functional: false
    },
    {
      id: "tesgo",
      name: "TesGo",
      logo: "🔴",
      bgColor: "bg-red-500",
      deliveryTime: "25 min",
      functional: false
    },
    {
      id: "asdeal",
      name: "AsDeal",
      logo: "💚",
      bgColor: "bg-emerald-500",
      deliveryTime: "22 min",
      functional: false
    },
    {
      id: "morrisave",
      name: "MorriSave",
      logo: "🟨",
      bgColor: "bg-yellow-500",
      deliveryTime: "30 min",
      functional: false
    }
  ];

  const restaurants = [
    {
      id: "golden-dragon",
      name: "Golden Dragon",
      cuisine: "Chinese",
      rating: 4.6,
      reviews: "300+",
      deliveryTime: "25-40 min",
      deliveryFee: "£1.99",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
      badge: "Free delivery",
      badgeColor: "bg-green-600"
    },
    {
      id: "spice-village",
      name: "Spice Village",
      cuisine: "Indian",
      rating: 4.4,
      reviews: "500+",
      deliveryTime: "20-35 min",
      deliveryFee: "£2.49",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      badge: "Popular",
      badgeColor: "bg-orange-600"
    },
    {
      id: "burger-house",
      name: "Burger House",
      cuisine: "American",
      rating: 4.2,
      reviews: "800+",
      deliveryTime: "15-30 min",
      deliveryFee: "£1.49",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      badge: "Fast delivery",
      badgeColor: "bg-blue-600"
    },
    {
      id: "pizza-palace",
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.5,
      reviews: "400+",
      deliveryTime: "20-35 min",
      deliveryFee: "£2.99",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      badge: "Hot deals",
      badgeColor: "bg-red-600"
    }
  ];

  const handleSupermarketClick = (supermarket: typeof supermarkets[0]) => {
    if (supermarket.functional && supermarket.id === "quickmart") {
      navigate("/quickmart");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Restaurants, groceries, dishes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border-2"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Delivering to your location</span>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Supermarkets Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Groceries, snacks, drinks and more</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              See all →
            </Button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {supermarkets.map((supermarket) => (
              <div
                key={supermarket.id}
                className={`flex-shrink-0 text-center cursor-pointer ${
                  supermarket.functional ? 'hover:opacity-80' : 'opacity-75'
                }`}
                onClick={() => handleSupermarketClick(supermarket)}
              >
                <div className={`w-16 h-16 rounded-full ${supermarket.bgColor} flex items-center justify-center text-white text-2xl mb-2 relative`}>
                  {supermarket.logo}
                  {!supermarket.functional && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">×</span>
                    </div>
                  )}
                </div>
                <div className="text-xs font-medium text-foreground mb-1">{supermarket.name}</div>
                <div className="text-xs text-muted-foreground">{supermarket.deliveryTime}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Banner Ad */}
        <BannerAd 
          title="Special Weekend Offers"
          subtitle="Get up to 30% off on selected restaurants and groceries"
          className="my-6"
        />

        {/* Restaurants Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Local favorites delivered fast</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              See all →
            </Button>
          </div>
          
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className={`absolute top-2 left-2 text-white text-xs ${restaurant.badgeColor}`}>
                        {restaurant.badge}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-foreground">{restaurant.name}</h3>
                        <div className="text-right text-xs text-muted-foreground">
                          {restaurant.deliveryTime}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-green-600">★</span>
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                          <span className="text-xs text-muted-foreground">({restaurant.reviews})</span>
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{restaurant.cuisine}</span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {restaurant.deliveryFee} delivery
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <BannerAd 
          title="20% off with Tasty Thursday"
          subtitle="Enjoy the dishes you love for less"
          className="mb-8"
        />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t px-4 py-2">
        <div className="flex justify-around">
          <div className="text-center">
            <div className="text-primary mb-1">🏠</div>
            <span className="text-xs text-primary font-medium">Home</span>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground mb-1">🔍</div>
            <span className="text-xs text-muted-foreground">Discover</span>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground mb-1">🍽️</div>
            <span className="text-xs text-muted-foreground">Restaurants</span>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground mb-1">🛒</div>
            <span className="text-xs text-muted-foreground">Groceries</span>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground mb-1">🛍️</div>
            <span className="text-xs text-muted-foreground">Shopping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;