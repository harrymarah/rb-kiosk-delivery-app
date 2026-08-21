import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useBasket } from "@/contexts/BasketContext";
import { useToast } from "@/hooks/use-toast";
import { isShopNewProduct } from "@/lib/product-utils";

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
               isNewArrival={isShopNewProduct(product.id)}
             />
          ))}
        </div>
      </div>
    </section>
  );
};

// Hook to load products from JSON with offline support
export const useProducts = () => {
  const [products, setProducts] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Try to load from localStorage first
        const cachedData = localStorage.getItem('productsData');
        if (cachedData) {
          const data = JSON.parse(cachedData);
          
          // Check if we have the new structure (array) or old structure (object)
          const productsArray = Array.isArray(data.products) ? data.products : [];
          
          if (productsArray.length === 0) {
            console.log('No products found in cache, structure:', data);
          }
          
          // Transform the new structure to the old format for backward compatibility
          const transformedProducts = {
            shopNew: productsArray.filter((p: any) => p.categories?.includes('newProducts')).map((p: any) => ({ ...p, category: 'newProducts', isNewArrival: true })),
            breakfast: productsArray.filter((p: any) => p.categories?.includes('breakfast')).map((p: any) => ({ ...p, category: 'breakfast' })),
            lunch: productsArray.filter((p: any) => p.categories?.includes('lunch')).map((p: any) => ({ ...p, category: 'lunch' })),
            meals: productsArray.filter((p: any) => p.categories?.includes('meals')).map((p: any) => ({ ...p, category: 'meals' })),
            snacks: productsArray.filter((p: any) => p.categories?.includes('snacks')).map((p: any) => ({ ...p, category: 'snacks' })),
            beverages: productsArray.filter((p: any) => p.categories?.includes('beverages')).map((p: any) => ({ ...p, category: 'beverages' })),
            energyDrinks: productsArray.filter((p: any) => p.categories?.includes('energyDrinks')).map((p: any) => ({ ...p, category: 'energyDrinks' })),
            matchReady: productsArray.filter((p: any) => p.categories?.includes('matchReady')).map((p: any) => ({ ...p, category: 'matchReady' })),
            softDrinks: productsArray.filter((p: any) => p.categories?.includes('softDrinks')).map((p: any) => ({ ...p, category: 'softDrinks' })),
            favourites: productsArray.filter((p: any) => p.categories?.includes('favourites')).map((p: any) => ({ ...p, category: 'favourites' })),
            redBull: productsArray.filter((p: any) => p.categories?.includes('redBull')).map((p: any) => ({ ...p, category: 'redBull' }))
          };
          
          setProducts(transformedProducts);
          setCategories(data.categories || []);
          
          // Use the unique products array directly
          const allProductsWithCategory = productsArray.map((p: any) => ({ 
            ...p, 
            category: p.categories?.[0] || 'unknown' // Use first category as primary category for backward compatibility
          }));
          setAllProducts(allProductsWithCategory);
          setIsLoading(false);
        }
        
        // Always try to fetch fresh data when online
        if (navigator.onLine) {
          const response = await fetch(`${import.meta.env.BASE_URL}data/products.json?v=${Date.now()}`);
          const data = await response.json();
          
          // Cache the data for offline use
          localStorage.setItem('productsData', JSON.stringify(data));
          
          // Check if we have the new structure (array) or old structure (object)
          const productsArray = Array.isArray(data.products) ? data.products : [];
          
          // Transform the new structure to the old format for backward compatibility
          const transformedProducts = {
            shopNew: productsArray.filter((p: any) => p.categories?.includes('newProducts')).map((p: any) => ({ ...p, category: 'newProducts', isNewArrival: true })),
            breakfast: productsArray.filter((p: any) => p.categories?.includes('breakfast')).map((p: any) => ({ ...p, category: 'breakfast' })),
            lunch: productsArray.filter((p: any) => p.categories?.includes('lunch')).map((p: any) => ({ ...p, category: 'lunch' })),
            meals: productsArray.filter((p: any) => p.categories?.includes('meals')).map((p: any) => ({ ...p, category: 'meals' })),
            snacks: productsArray.filter((p: any) => p.categories?.includes('snacks')).map((p: any) => ({ ...p, category: 'snacks' })),
            beverages: productsArray.filter((p: any) => p.categories?.includes('beverages')).map((p: any) => ({ ...p, category: 'beverages' })),
            energyDrinks: productsArray.filter((p: any) => p.categories?.includes('energyDrinks')).map((p: any) => ({ ...p, category: 'energyDrinks' })),
            matchReady: productsArray.filter((p: any) => p.categories?.includes('matchReady')).map((p: any) => ({ ...p, category: 'matchReady' })),
            softDrinks: productsArray.filter((p: any) => p.categories?.includes('softDrinks')).map((p: any) => ({ ...p, category: 'softDrinks' })),
            favourites: productsArray.filter((p: any) => p.categories?.includes('favourites')).map((p: any) => ({ ...p, category: 'favourites' })),
            redBull: productsArray.filter((p: any) => p.categories?.includes('redBull')).map((p: any) => ({ ...p, category: 'redBull' }))
          };
          
          setProducts(transformedProducts);
          setCategories(data.categories || []);
          
          // Use the unique products array directly
          const allProductsWithCategory = productsArray.map((p: any) => ({ 
            ...p, 
            category: p.categories?.[0] || 'unknown' // Use first category as primary category for backward compatibility
          }));
          setAllProducts(allProductsWithCategory);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
        
        // If online fetch fails, try to use cached data
        const cachedData = localStorage.getItem('productsData');
        if (cachedData) {
          const data = JSON.parse(cachedData);
          
          // Check if we have the new structure (array) or old structure (object)
          const productsArray = Array.isArray(data.products) ? data.products : [];
          
          // Transform the new structure to the old format for backward compatibility
          const transformedProducts = {
            shopNew: productsArray.filter((p: any) => p.categories?.includes('newProducts')).map((p: any) => ({ ...p, category: 'newProducts', isNewArrival: true })),
            breakfast: productsArray.filter((p: any) => p.categories?.includes('breakfast')).map((p: any) => ({ ...p, category: 'breakfast' })),
            lunch: productsArray.filter((p: any) => p.categories?.includes('lunch')).map((p: any) => ({ ...p, category: 'lunch' })),
            meals: productsArray.filter((p: any) => p.categories?.includes('meals')).map((p: any) => ({ ...p, category: 'meals' })),
            snacks: productsArray.filter((p: any) => p.categories?.includes('snacks')).map((p: any) => ({ ...p, category: 'snacks' })),
            beverages: productsArray.filter((p: any) => p.categories?.includes('beverages')).map((p: any) => ({ ...p, category: 'beverages' })),
            energyDrinks: productsArray.filter((p: any) => p.categories?.includes('energyDrinks')).map((p: any) => ({ ...p, category: 'energyDrinks' })),
            matchReady: productsArray.filter((p: any) => p.categories?.includes('matchReady')).map((p: any) => ({ ...p, category: 'matchReady' })),
            softDrinks: productsArray.filter((p: any) => p.categories?.includes('softDrinks')).map((p: any) => ({ ...p, category: 'softDrinks' })),
            favourites: productsArray.filter((p: any) => p.categories?.includes('favourites')).map((p: any) => ({ ...p, category: 'favourites' })),
            redBull: productsArray.filter((p: any) => p.categories?.includes('redBull')).map((p: any) => ({ ...p, category: 'redBull' }))
          };
          
          setProducts(transformedProducts);
          setCategories(data.categories || []);
          
          const allProductsWithCategory = productsArray.map((p: any) => ({ 
            ...p, 
            category: p.categories?.[0] || 'unknown' // Use first category as primary category for backward compatibility
          }));
          setAllProducts(allProductsWithCategory);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { products, categories, allProducts, isLoading };
};

export default ProductSection;