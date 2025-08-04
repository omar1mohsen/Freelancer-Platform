
// src/types/index.ts
export interface Freelancer {
  id: string;
  name: string;
  profileImage: string;
  level: number;
  role: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  category: string;
  location: string;
  deliveryTime: number;
}

export interface FilterState {
  serviceOptions: string;
  sellerDetails: string;
  budget: string;
  deliveryTime: string;
  location: string;
  sortBy: string;
}

export type SortOption = 'mostRated' | 'lowestRated' | 'highestPrice' | 'lowestPrice';
