import { ReactNode } from "react";
import ProductCard from "./ProductCard";
import { useBasket } from "@/contexts/BasketContext";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  title: string;
  /** Category-driver icon shown beside the title. Decorative. */
  icon?: ReactNode;
  products: Array<{
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    offer?: string;
    image: string;
    isNewArrival?: boolean;
  }>;
  favorites?: Set<string>;
  onToggleFavorite?: (productId: string) => void;
  /** Renders a "See All" link beside the title when provided. */
  onSeeAll?: () => void;
}

const ProductCarousel = ({ title, icon, products, favorites = new Set(), onToggleFavorite, onSeeAll }: ProductCarouselProps) => {
  const { addItem } = useBasket();
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to basket",
      description: `${product.name} has been added to your basket`,
    });
  };

  // Safety check: if products is undefined or empty, don't render
  if (!products || products.length === 0) {
    return null;
  }
  return (
    <section className="px-4 py-4">
      <div className="container mx-auto max-w-4xl">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          {/* Arrows sit beside the title so they never cover the cards. */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {title ? (
              <h2 className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-foreground">
                {icon && <span aria-hidden="true" className="text-primary">{icon}</span>}
                {title}
              </h2>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-1.5 shrink-0">
              {onSeeAll && (
                <button
                  onClick={onSeeAll}
                  className="mr-1 text-primary hover:text-primary/80 text-sm font-medium whitespace-nowrap"
                >
                  See All →
                </button>
              )}
              <CarouselPrevious className="static h-7 w-7 translate-y-0" />
              <CarouselNext className="static h-7 w-7 translate-y-0" />
            </div>
          </div>

          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-1/3">
                <div className="h-full">
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    offer={product.offer}
                    isFavorite={favorites.has(product.id)}
                    onToggleFavorite={() => onToggleFavorite?.(product.id)}
                    onAddToCart={() => handleAddToCart(product)}
                    productId={product.id}
                    isNewArrival={product.isNewArrival}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;