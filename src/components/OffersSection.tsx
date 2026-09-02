import { Percent, Plus } from "lucide-react";
import { useBasket } from "@/contexts/BasketContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface OffersSectionProps {
  title: string;
  products: any[];
  onSeeAll?: () => void;
}

/**
 * The "Offers" row, styled after the deals panel in the client's reference
 * screenshot: a tinted panel with a percentage flash, and cards showing the
 * offer price against the struck-through original.
 *
 * Three products per row, per the same feedback.
 */
const OffersSection = ({ title, products, onSeeAll }: OffersSectionProps) => {
  const { addItem } = useBasket();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (products.length === 0) return null;

  const handleAdd = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "Added to basket",
      description: `${product.name} has been added to your basket`,
    });
  };

  return (
    <section className="px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="rounded-2xl bg-storefront-tint p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground">
              {title}
            </h2>
            <div className="flex items-center gap-2">
              {onSeeAll && (
                <button
                  onClick={onSeeAll}
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  See All →
                </button>
              )}
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive text-destructive-foreground"
                aria-hidden="true"
              >
                <Percent className="h-5 w-5" strokeWidth={2.5} />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-xl bg-card p-2 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-full rounded-lg object-contain"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(product);
                    }}
                    aria-label={`Add ${product.name} to basket`}
                    className="absolute -bottom-1 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-sm font-bold leading-none text-destructive">
                  {product.price}
                </div>

                {product.originalPrice && (
                  <div className="mt-1 text-[10px] leading-none text-muted-foreground line-through">
                    {product.originalPrice}
                  </div>
                )}

                {product.discountPercent ? (
                  <div className="mt-1.5 self-start rounded bg-destructive px-1.5 py-0.5 text-[10px] font-bold leading-none text-destructive-foreground">
                    {product.discountPercent}% off
                  </div>
                ) : null}

                <div className="mt-1.5 line-clamp-2 text-[11px] leading-tight text-foreground">
                  {product.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
