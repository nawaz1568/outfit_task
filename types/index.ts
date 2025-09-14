export interface Item {
  id: string;
  name: string;
  category: 'top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory';
  subcategory: string;
  color: string;
  style: string[];
  price: number;
  image: string;
  brand: string;
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'all-season';
}

export interface OutfitItem {
  id: string;
  category: 'top' | 'bottom' | 'footwear' | 'outerwear';
  image: string;
  name: string;
}

export interface Outfit {
  id: string;
  title: string;
  occasion: string;
  season: string;
  tags: string[];
  items: {
    top: OutfitItem;
    bottom: OutfitItem;
    footwear: OutfitItem;
    outerwear?: OutfitItem;
  };
  createdAt: string;
}

export interface Collection {
  id: string;
  title: string;
  coverImage: string;
  itemCount: number;
  tags: string[];
  createdAt: string;
}

export interface FilterState {
  categories: string[];
  colors: string[];
  styles: string[];
  occasions: string[];
  seasons: string[];
}

export type TabType = 'Collections' | 'Outfits' | 'Items';