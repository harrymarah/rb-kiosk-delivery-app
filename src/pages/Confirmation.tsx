import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, MapPin, ShoppingBag } from "lucide-react";
import { useProducts } from "@/components/ProductSection";
import { useBasket } from "@/contexts/BasketContext";

const Confirmation = () => {
  const navigate = useNavigate();
  const { allProducts } = useProducts();
  const { addItem } = useBasket();
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const didSetRecommendations = useRef(false);

  useEffect(() => {
    // Calculate delivery time (12-18 minutes from now, centered around 15 minutes)
    const now = new Date();
    const deliveryMinutes = Math.floor(Math.random() * 7) + 12; // 12-18 minutes
    const deliveryDate = new Date(now.getTime() + deliveryMinutes * 60000);

    setDeliveryTime(
      deliveryDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    setTimeRemaining(deliveryMinutes * 60); // in seconds

    // Update countdown every second (does not affect recommendations)
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Set recommended products only once when products first become available
  useEffect(() => {
    if (!didSetRecommendations.current && allProducts && allProducts.length > 0) {
      const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
      setRecommendedProducts(shuffled.slice(0, 4));
      didSetRecommendations.current = true;
    }
  }, [allProducts]);

  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-scale-in">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. We're preparing it for delivery.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Delivery Status */}
          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Estimated Delivery</h3>
                  <p className="text-sm text-muted-foreground">Your order is being prepared</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Delivery by:</span>
                  <span className="text-lg font-bold text-primary">{deliveryTime}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Time remaining:</span>
                  <span className="text-lg font-mono font-bold text-orange-600">
                    {formatTimeRemaining(timeRemaining)}
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000 animate-pulse"
                    style={{ width: '25%' }}
                  ></div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Driver will contact you when nearby</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Order Status</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Order received</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Preparing your order</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-muted rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Out for delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-muted rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Delivered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Recommendations */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            While you wait, discover more products
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {recommendedProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover-scale"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div onClick={() => navigate(`/product/${product.id}`)}>
                    <div className="w-full h-32 bg-muted rounded-lg overflow-hidden mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-sm text-foreground truncate mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.price}</p>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      });
                    }}
                  >
                    Add to Basket
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Button>
          <Button
            size="lg"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Start New Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;