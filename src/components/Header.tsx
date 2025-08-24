import { Search, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-primary min-h-[200px] relative overflow-hidden">
      {/* Floating product images */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-20 w-16 h-16 bg-brand-yellow rounded-lg"></div>
        <div className="absolute top-8 right-32 w-12 h-20 bg-red-500 rounded-lg"></div>
        <div className="absolute top-12 left-1/3 w-14 h-18 bg-orange-400 rounded-lg"></div>
        <div className="absolute top-6 right-20 w-20 h-16 bg-green-400 rounded-lg"></div>
        <div className="absolute bottom-20 left-40 w-12 h-16 bg-yellow-300 rounded-lg"></div>
        <div className="absolute bottom-16 right-40 w-16 h-12 bg-purple-400 rounded-lg"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <Search className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-bold text-brand-yellow mb-4 tracking-wider">
            QUICKMART
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;