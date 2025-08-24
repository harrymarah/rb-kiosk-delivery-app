import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

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
}

const ProductSection = ({ title, products }: ProductSectionProps) => {
  return (
    <section className="px-6 py-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
        
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              offer={product.offer}
              onAddToCart={() => console.log(`Added ${product.name} to cart`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Hook to load products from JSON
export const useProducts = () => {
  const [products, setProducts] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        setProducts(data.products);
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadData();
  }, []);

  return { products, categories };
};

export default ProductSection;