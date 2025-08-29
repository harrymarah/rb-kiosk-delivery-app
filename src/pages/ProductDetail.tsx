import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowLeft, Plus, Minus, ShoppingCart, Star, ChevronRight, Home } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/components/ProductSection";
import { useBasket } from "@/contexts/BasketContext";
import { useToast } from "@/components/ui/use-toast";
import { OfferDrawer } from "@/components/OfferDrawer";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  offer?: string;
  image: string;
  category: string;
  description?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allProducts, isLoading } = useProducts();
  const { addItem } = useBasket();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showOfferDrawer, setShowOfferDrawer] = useState(false);

  useEffect(() => {
    if (allProducts && id) {
      const foundProduct = allProducts.find((p: Product) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products from the same category
        const related = allProducts
          .filter((p: Product) => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [allProducts, id]);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (!product) return;
    
    // Show offer drawer instead of immediately adding to cart
    setShowOfferDrawer(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto max-w-4xl px-6 py-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-muted-foreground">Loading product...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto max-w-4xl px-6 py-8">
          <p className="text-center text-muted-foreground">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto max-w-7xl px-6 py-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
          <button 
            onClick={() => navigate('/')}
            className="hover:text-foreground transition-colors"
          >
            Products
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product image */}
          <div className="lg:max-w-md">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-border shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-6">
            {/* Product title */}
            <h1 className="text-2xl font-bold text-foreground leading-tight">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.3 stars (35 Reviews)</span>
            </div>

            {/* Price match badge */}
            {product.offer && (
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                <span>Price Match</span>
              </div>
            )}

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">£0.21/100ml</p>
            </div>

            {/* Quantity and Add button */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-foreground">Quantity:</label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    className="h-10 w-10 rounded-r-none border-r-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-10 w-16 flex items-center justify-center border-t border-b border-border bg-background">
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-10 w-10 rounded-l-none border-l-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium"
                  size="lg"
                >
                  Add
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="px-4"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Usually bought next / Related products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Usually bought next</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-white rounded-lg overflow-hidden mb-3 border border-border">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                        onClick={() => navigate(`/product/${relatedProduct.id}`)}
                      />
                    </div>
                    <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">{relatedProduct.price}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(`Added ${relatedProduct.name} to cart`);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Offer Drawer */}
      {product && (
        <OfferDrawer
          isOpen={showOfferDrawer}
          onClose={() => {
            setShowOfferDrawer(false);
            setQuantity(1); // Reset quantity after drawer closes
          }}
          product={product}
          quantity={quantity}
          onAcceptOffer={(offer) => {
            console.log('Offer accepted:', offer);
          }}
          onDeclineOffer={() => {
            console.log('Offer declined');
          }}
        />
      )}
    </div>
  );
};

export default ProductDetail;