import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
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
      
      <div className="container mx-auto max-w-6xl px-6 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product image */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-foreground">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              {product.offer && (
                <div className="flex items-center gap-2 text-destructive font-medium">
                  <Heart className="h-4 w-4 fill-destructive" />
                  <span>{product.offer}</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "A high-quality product perfect for your daily needs. Made with care and attention to detail, this item offers great value and satisfaction."}
              </p>
            </div>

            {/* Quantity selector and actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    className="h-10 w-10 rounded-none border-r border-border"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-10 w-10 rounded-none border-l border-border"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Basket
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="px-4"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  image={relatedProduct.image}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  originalPrice={relatedProduct.originalPrice}
                  offer={relatedProduct.offer}
                  isFavorite={false}
                  onToggleFavorite={() => {}}
                  onAddToCart={() => console.log(`Added ${relatedProduct.name} to cart`)}
                  productId={relatedProduct.id}
                />
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