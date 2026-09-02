import { ReactNode } from "react";
import {
  BadgePercent,
  Ghost,
  Heart,
  Leaf,
  Sparkles,
  TrendingUp,
  Wine,
} from "lucide-react";

/**
 * Icon per category driver, as asked for on the "Catalogue information" tab
 * ("Add the icons for each of the category drivers to each of the categories").
 * Keyed by the category ids in products.json.
 */
const CATEGORY_ICONS: Record<string, ReactNode> = {
  favourites: <Heart className="h-4 w-4" />,
  offers: <BadgePercent className="h-4 w-4" />,
  newIn: <Sparkles className="h-4 w-4" />,
  mostPopular: <TrendingUp className="h-4 w-4" />,
  halloween: <Ghost className="h-4 w-4" />,
  alcoholMixers: <Wine className="h-4 w-4" />,
  healthWellness: <Leaf className="h-4 w-4" />,
};

export const getCategoryIcon = (categoryId: string): ReactNode =>
  CATEGORY_ICONS[categoryId] ?? null;
