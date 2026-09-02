import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getProductImageUrl } from '@/lib/image';

export interface FavoriteItem {
  id: string;
  offer?: string;
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

/**
 * The old default list hardcoded twelve products from the superseded
 * catalogue, with image URLs to match; none of those ids survive in the 2026
 * Q-Comm list. Seed from the catalogue's own "Favourites" category instead, so
 * the kiosk still opens with favourites populated and they are real products.
 */
const seedFavorites = async (): Promise<FavoriteItem[]> => {
  const response = await fetch(`${import.meta.env.BASE_URL}data/products.json`);
  if (!response.ok) return [];
  const data = await response.json();
  return (data.products || [])
    .filter((p: any) => p.categories?.includes('favourites'))
    .sort((a: any, b: any) => (a.ranks?.favourites ?? 99) - (b.ranks?.favourites ?? 99))
    .map((p: any) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: getProductImageUrl(p.imagePath),
      category: 'favourites',
      offer: p.offer,
    }));
};

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    seedFavorites()
      .then((seed) => {
        // Don't clobber anything the shopper hearted while this was in flight.
        if (!cancelled) setFavorites((prev) => (prev.length ? prev : seed));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

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