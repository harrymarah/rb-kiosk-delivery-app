import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useBasket } from "@/contexts/BasketContext";
import { useToast } from "@/hooks/use-toast";
import { isNewArrival } from "@/lib/product-utils";
import { getProductImageUrl } from "@/lib/image";

interface ProductSectionProps {
  title: string;
  products: Array<{
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    offer?: string;
    image: string;
  }>;
  favorites?: Set<string>;
  onToggleFavorite?: (productId: string) => void;
}

const ProductSection = ({ title, products, favorites = new Set(), onToggleFavorite }: ProductSectionProps) => {
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
  return (
    <section className="px-4 py-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl font-bold text-foreground mb-3">{title}</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
             <ProductCard
               key={product.id}
               image={product.image}
               name={product.name}
               price={product.price}
               originalPrice={product.originalPrice}
               offer={product.offer}
               isFavorite={favorites.has(product.id)}
               onToggleFavorite={() => onToggleFavorite?.(product.id)}
               onAddToCart={() => handleAddToCart(product)}
               productId={product.id}
               isNewArrival={isNewArrival(product)}
             />
          ))}
        </div>
      </div>
    </section>
  );
};

// Hook to load products from JSON with offline support
//
// Grouping is driven by the `categories` array in products.json rather than a
// hardcoded list, so a catalogue change (like the 2026 Q-Comm list, which
// replaced the old taxonomy wholesale) needs no code change here.
const CACHE_KEY = 'productsData.v2026-qcomm';

/** Group products by category id, ordered by each category's rank in the sheet. */
const groupByCategory = (data: any) => {
  const productsArray: any[] = Array.isArray(data?.products) ? data.products : [];
  const categories: any[] = Array.isArray(data?.categories) ? data.categories : [];

  const withImage = productsArray.map((p) => ({
    ...p,
    image: getProductImageUrl(p.imagePath),
    // First category doubles as the primary one for older call sites.
    category: p.categories?.[0] || 'unknown',
    isNewArrival: p.offer === 'New Arrival',
  }));

  const grouped: Record<string, any[]> = {};
  categories.forEach((cat) => {
    grouped[cat.id] = withImage
      .filter((p) => p.categories?.includes(cat.id))
      .sort((a, b) => (a.ranks?.[cat.id] ?? 99) - (b.ranks?.[cat.id] ?? 99))
      .map((p) => ({ ...p, category: cat.id }));
  });

  return { grouped, categories, all: withImage };
};

export const useProducts = () => {
  const [products, setProducts] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apply = (data: any) => {
      const { grouped, categories: cats, all } = groupByCategory(data);
      setProducts(grouped);
      setCategories(cats);
      setAllProducts(all);
    };

    const loadData = async () => {
      try {
        setIsLoading(true);

        // Serve the cache first so an offline kiosk still renders.
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            apply(JSON.parse(cached));
          } catch {
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // Then refresh from the network, and re-cache for next time.
        const response = await fetch(`${import.meta.env.BASE_URL}data/products.json`);
        if (response.ok) {
          const data = await response.json();
          apply(data);
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        }
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { products, categories, allProducts, isLoading };
};

export default ProductSection;
