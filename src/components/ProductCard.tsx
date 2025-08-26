import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-border" onClick={handleCardClick}>
      <CardContent className="p-4">
        <div className="relative mb-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={name} 
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
          </Button>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-foreground line-clamp-2">{name}</h3>
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
          
          {offer && (
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-destructive fill-destructive" />
              <span className="text-sm font-medium text-destructive">{offer}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;