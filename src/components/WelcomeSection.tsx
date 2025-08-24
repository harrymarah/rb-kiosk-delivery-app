import { Star, Truck, Receipt } from "lucide-react";

const WelcomeSection = () => {
  return (
    <section className="bg-background px-6 py-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Welcome to QuickMart
        </h2>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-primary fill-primary" />
            <div>
              <span className="text-2xl font-bold text-primary">4.8</span>
              <span className="text-lg text-primary ml-2">Excellent</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Truck className="h-6 w-6 text-primary" />
            <div>
              <span className="text-lg text-foreground">Deliver in</span>
              <span className="text-lg font-semibold text-primary ml-2">15-30 minutes</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Receipt className="h-6 w-6 text-primary" />
            <div>
              <span className="text-lg text-foreground">Minimum order</span>
              <span className="text-lg font-semibold text-primary ml-2">£15</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;