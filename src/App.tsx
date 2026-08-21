import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { BasketProvider } from "@/contexts/BasketContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { StickyCartBar } from "@/components/StickyCartBar";
import PhoneFrame from "@/components/PhoneFrame";
import HomePage from "./pages/HomePage";
import Discover from "./pages/Discover";
import Index from "./pages/Index";
import Basket from "./pages/Basket";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import RedBullProducts from "./pages/RedBullProducts";
import Reservations from "./pages/Reservations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <BasketProvider>
        <TooltipProvider>
        <HashRouter>
          <PhoneFrame>
            <Toaster />
            <Sonner />
            <div className="pb-24">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/quickmart" element={<Index />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/red-bull-products" element={<RedBullProducts />} />
                <Route path="/reservations" element={<Reservations />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <StickyCartBar />
          </PhoneFrame>
        </HashRouter>
        </TooltipProvider>
      </BasketProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;
