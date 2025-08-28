import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  return (
    <section className="bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <img 
          src={heroBanner} 
          alt="QuickMart - Fast Grocery Delivery Hero Banner"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;