import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FavoriteItem {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

// Default favorites: Red Bull products, hot drinks, and lunch items
const defaultFavorites: FavoriteItem[] = [
  {
    id: "49",
    name: "Red Bull Original",
    price: "£2.55",
    image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/red_bull_assets/red_bull_original.png",
    category: "beverages"
  },
  {
    id: "52",
    name: "Red Bull Tropical Edition",
    price: "£2.75",
    image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/red_bull_assets/red_bull_tropical_edition.png",
    category: "beverages"
  },
  {
    id: "53",
    name: "Red Bull Blue Edition",
    price: "£2.75",
    image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/red_bull_assets/red_bull_blue_edition.png",
    category: "beverages"
  },
  {
    id: "48",
    name: "Hot Chocolate",
    price: "£2.95",
    image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/breakfast-items.jpg",
    category: "beverages"
  },
  {
    id: "14",
    name: "Coffee Beans Premium",
    price: "£7.99",
    image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/breakfast-items.jpg",
    category: "beverages"
  },
  {
    id: "15",
    name: "Club Sandwich",
    price: "£6.50",
    image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/sandwich.jpg",
    category: "lunch"
  },
  {
    id: "16",
    name: "Caesar Salad",
    price: "£5.75",
    image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/salad.jpg",
    category: "lunch"
  },
  {
    id: "25",
    name: "Spaghetti Bolognese",
    price: "£7.99",
    image: "https://ytmpkdrfujdbfkfhnimq.supabase.co/storage/v1/object/public/Food%20Delivery%20Assets/pasta.jpg",
    category: "meals"
  }
];

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(defaultFavorites);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.find(fav => fav.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};