import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Filter, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import BannerAd from "@/components/BannerAd";
import PromoBanner from "@/components/PromoBanner";
import AsDealsLogo from "@/assets/logos/AsDeal_logo.png";
import MorriSaveLogo from "@/assets/logos/MorriSave_logo.png";
import SaneBuryLogo from "@/assets/logos/SaneBury_logo.png";
import StopRoseLogo from "@/assets/logos/StopRose_logo.png";
import NoOpLogo from "@/assets/logos/NoOp_logo.png";
import QuickMartLogo from "@/assets/logos/QuickMart_logo.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleReturnToSelector = () => {
    window.location.href = "https://redbullswitch.harrymarah.uk";
  };

  const supermarkets = [
    {
      id: "quickmart",
      name: "QuickMart",
      logo: QuickMartLogo,
      logoType: "image",
      bgColor: "bg-blue-500",
      deliveryTime: "15 min",
      functional: true
    },
    {
      id: "waitrose",
      name: "StopRose & P...",
      logo: StopRoseLogo,
      logoType: "image",
      bgColor: "bg-green-500",
      deliveryTime: "20 min",
      functional: false
    },
    {
      id: "sainsbury",
      name: "SaneBury's",
      logo: SaneBuryLogo,
      logoType: "image",
      bgColor: "bg-orange-500",
      deliveryTime: "18 min",
      functional: false
    },
    {
      id: "noop",
      name: "NoOp",
      logo: NoOpLogo,
      logoType: "image",
      bgColor: "bg-red-500",
      deliveryTime: "25 min",
      functional: false
    },
    {
      id: "asdeal",
      name: "AsDeal",
      logo: AsDealsLogo,
      logoType: "image",
      bgColor: "bg-emerald-500",
      deliveryTime: "22 min",
      functional: false
    },
    {
      id: "morrisave",
      name: "MorriSave",
      logo: MorriSaveLogo,
      logoType: "image",
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
      image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop&auto=format",
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
      image: "https://images.unsplash.com/photo-1574653406055-21c4b9a7b0a9?w=400&h=300&fit=crop&auto=format",
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
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format",
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
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format",
      badge: "Hot deals",
      badgeColor: "bg-red-600"
    },
    {
      id: "mediterranean-grill",
      name: "Mediterranean Grill",
      cuisine: "Mediterranean",
      rating: 4.7,
      reviews: "250+",
      deliveryTime: "30-45 min",
      deliveryFee: "£2.99",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&auto=format",
      badge: "Healthy choice",
      badgeColor: "bg-emerald-600"
    },
    {
      id: "sushi-express",
      name: "Sushi Express",
      cuisine: "Japanese",
      rating: 4.8,
      reviews: "180+",
      deliveryTime: "25-35 min",
      deliveryFee: "£3.49",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format",
      badge: "Premium",
      badgeColor: "bg-purple-600"
    },
    {
      id: "tex-mex-cantina",
      name: "Tex-Mex Cantina",
      cuisine: "Mexican",
      rating: 4.3,
      reviews: "350+",
      deliveryTime: "20-30 min",
      deliveryFee: "£1.99",
      image: "https://images.unsplash.com/photo-1574653406955-8b6b8cb733c1?w=400&h=300&fit=crop&auto=format",
      badge: "Spicy hot",
      badgeColor: "bg-red-600"
    },
    {
      id: "greek-taverna",
      name: "Greek Taverna",
      cuisine: "Greek",
      rating: 4.5,
      reviews: "220+",
      deliveryTime: "35-50 min",
      deliveryFee: "£2.49",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&auto=format",
      badge: "Authentic",
      badgeColor: "bg-blue-600"
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-30 hover:opacity-60">
                <Settings className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Return to App Selector</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to return to the Red Bull app selector? This will leave the current application.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReturnToSelector}>
                  Return to Selector
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Earlham Street</span>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6 max-w-6xl mx-auto">
        {/* Supermarkets Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Groceries, snacks, drinks and more</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              See all →
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {supermarkets.map((supermarket) => (
              <div
                key={supermarket.id}
                className={`text-center cursor-pointer p-4 rounded-lg hover:bg-muted/50 transition-colors ${
                  supermarket.functional ? 'hover:opacity-80' : 'opacity-75'
                }`}
                onClick={() => handleSupermarketClick(supermarket)}
              >
                <div className={`w-20 h-20 mx-auto rounded-full ${supermarket.bgColor} flex items-center justify-center text-white text-2xl mb-3 relative overflow-hidden shadow-md`}>
                  <img 
                    src={supermarket.logo} 
                    alt={supermarket.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-sm font-medium text-foreground mb-1">{supermarket.name}</div>
                <div className="text-sm text-muted-foreground">{supermarket.deliveryTime}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <PromoBanner 
          title="20% off with Tasty Thursday"
          subtitle="Enjoy the dishes you love for less"
          className="my-8"
        />

        {/* Restaurants Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Local favorites delivered fast</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              See all →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-40">
                <CardContent className="p-0 h-full">
                  <div className="flex h-full">
                    <div className="relative w-40 lg:w-44 h-full flex-shrink-0">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format";
                        }}
                      />
                      <Badge className={`absolute top-3 left-3 text-white text-xs ${restaurant.badgeColor}`}>
                        {restaurant.badge}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="font-semibold text-foreground text-xl">{restaurant.name}</h3>
                          <div className="text-sm text-muted-foreground font-medium">
                            {restaurant.deliveryTime}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1">
                            <span className="text-green-600 text-lg">★</span>
                            <span className="text-sm font-medium">{restaurant.rating}</span>
                            <span className="text-sm text-muted-foreground">({restaurant.reviews})</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{restaurant.cuisine}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground font-medium">
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
          className="mb-12"
        />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t px-4 py-2">
        <div className="flex justify-around">
          <div className="text-center">
            <div className="text-primary mb-1">🏠</div>
            <span className="text-xs text-primary font-medium">Home</span>
          </div>
          <div className="text-center cursor-pointer" onClick={() => navigate("/discover")}>
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