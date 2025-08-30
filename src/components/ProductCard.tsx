import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getProxiedImageUrl } from "@/lib/image";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  offer?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: () => void;
  productId?: string;
}

const ProductCard = ({ 
  image, 
  name, 
  price, 
  originalPrice, 
  offer,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
  productId
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-border h-full flex flex-col" onClick={handleCardClick}>
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="relative mb-6">
          <div className="aspect-square bg-white rounded-lg overflow-hidden border border-border/20">
            <img 
              src={getProxiedImageUrl(image)} 
              alt={name} 
              loading="lazy"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => { 
                const target = e.currentTarget as HTMLImageElement;
                // Only fallback to placeholder if it's not already a placeholder and not a retry
                if (!target.src.includes('placeholder') && !target.dataset.retried) {
                  target.dataset.retried = 'true';
                  target.src = '/placeholder.svg';
                }
              }}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <Button
            variant="ghost"
            size="lg"
            className="absolute top-[clamp(0.5rem,1vw,1rem)] right-[clamp(0.5rem,1vw,1rem)] h-[clamp(3rem,4vw,5rem)] w-[clamp(3rem,4vw,5rem)] bg-gray-100/90 hover:bg-gray-200/90 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
          >
            <Heart className={`h-[clamp(1.5rem,2vw,2.5rem)] w-[clamp(1.5rem,2vw,2.5rem)] ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
          </Button>
        </div>
        
        <div className="space-y-[clamp(0.75rem,1vw,1.5rem)] flex-1 flex flex-col justify-end">
          <h3 className="font-medium text-foreground line-clamp-2 text-[clamp(1rem,1.5vw,2rem)]">{name}</h3>
          
          <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)]">
            <span className="text-[clamp(1.25rem,2vw,2.5rem)] font-bold text-foreground">{price}</span>
            {originalPrice && (
              <span className="text-[clamp(1rem,1.5vw,1.5rem)] text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
          
          {offer && (
            <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)]">
              <Heart className="h-[clamp(1rem,1.5vw,1.5rem)] w-[clamp(1rem,1.5vw,1.5rem)] text-destructive fill-destructive" />
              <span className="text-[clamp(1rem,1.5vw,1.5rem)] font-medium text-destructive">{offer}</span>
            </div>
          )}
          
          {onAddToCart && (
            <Button
              size="lg"
              className="w-full mt-[clamp(1rem,2vw,2rem)] h-[clamp(3rem,4vw,5rem)] text-[clamp(1.125rem,1.5vw,2rem)]"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
              <ShoppingCart className="h-[clamp(1rem,1.5vw,2rem)] w-[clamp(1rem,1.5vw,2rem)] mr-[clamp(0.5rem,1vw,1rem)]" />
              Add to Basket
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;