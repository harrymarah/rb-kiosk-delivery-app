import ProductCard from "./ProductCard";
import redBullOriginal from "@/assets/red-bull-original.jpg";
import redBullSugarFree from "@/assets/red-bull-sugar-free.jpg";
import redBullTropical from "@/assets/red-bull-tropical.jpg";
import breakfastItems from "@/assets/breakfast-items.jpg";

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

// Mock data for products
export const shopNewProducts = [
  {
    id: "1",
    name: "Red Bull Original",
    price: "£2.55",
    offer: "2 for £4.00",
    image: redBullOriginal
  },
  {
    id: "2", 
    name: "Red Bull Sugar Free",
    price: "£2.55",
    offer: "2 for £4.00",
    image: redBullSugarFree
  },
  {
    id: "3",
    name: "Red Bull Tropical",
    price: "£2.55", 
    offer: "2 for £4.00",
    image: redBullTropical
  },
  {
    id: "4",
    name: "Red Bull Blue Edition",
    price: "£2.55",
    offer: "2 for £4.00", 
    image: redBullOriginal
  }
];

export const breakfastProducts = [
  {
    id: "5",
    name: "Fresh Croissants",
    price: "£3.99",
    image: breakfastItems
  },
  {
    id: "6",
    name: "Breakfast Muffins",
    price: "£4.50",
    offer: "Buy 2 Get 1 Free",
    image: breakfastItems
  },
  {
    id: "7", 
    name: "Orange Juice",
    price: "£2.85",
    image: breakfastItems
  },
  {
    id: "8",
    name: "Coffee Beans",
    price: "£5.99",
    image: breakfastItems
  }
];

export default ProductSection;