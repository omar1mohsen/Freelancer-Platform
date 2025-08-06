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
  category?: string;
  location: string;
  deliveryTime: number;
  createdAt?: string; // For newest sort
  updatedAt?: string; // For tracking updates
  isActive?: boolean; // For filtering active freelancers
  skills?: string[]; // For skill-based filtering
  description?: string; // For enhanced search
  completedProjects?: number; // For experience filtering
}

export interface FilterState {
  serviceOptions: string;
  sellerDetails: string;
  budget: string;
  deliveryTime: string;
  location: string;
}

export type SortOption = 
  | 'mostRated' 
  | 'lowestRated' 
  | 'highestPrice' 
  | 'lowestPrice'
  | 'newest'
  | 'mostReviewed';

// Enhanced search configuration
export interface SearchConfig {
  searchableFields: (keyof Freelancer)[];
  minSearchLength: number;
  debounceMs: number;
}

// Filter options for dynamic generation
export interface FilterOptions {
  categories: string[];
  levels: number[];
  budgetRanges: { value: string; label: string; min: number; max?: number }[];
  deliveryTimes: { value: string; label: string; days: number }[];
}