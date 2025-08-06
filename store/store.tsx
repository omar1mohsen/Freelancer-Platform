// src/store/useFreelancerStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Freelancer, FilterState, SortOption } from '@/types';

interface FreelancerStore {
  // State
  freelancers: Freelancer[];
  filteredFreelancers: Freelancer[];
  filters: FilterState;
  sortBy: SortOption;
  searchTerm: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setFreelancers: (freelancers: Freelancer[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  applyFiltersAndSort: () => void;
}

const INITIAL_FILTERS: FilterState = {
  serviceOptions: '',
  sellerDetails: '',
  budget: '',
  deliveryTime: '',
  location: ''
};

// Pure function for filtering freelancers
const filterFreelancers = (
  freelancers: Freelancer[],
  filters: FilterState,
  searchTerm: string
): Freelancer[] => {
  return freelancers.filter((freelancer) => {
    // Search term matching (name, role, category, location)
    const searchMatches = !searchTerm || [
      freelancer.name,
      freelancer.role,
      freelancer.category,
      freelancer.location
    ].some(field => 
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Location filter
    const locationMatches = !filters.location || 
      freelancer.location.toLowerCase().includes(filters.location.toLowerCase());

    // Service/Category filter
    const serviceMatches = !filters.serviceOptions || 
      freelancer.category?.toLowerCase() === filters.serviceOptions.toLowerCase();

    // Seller level filter
    const sellerMatches = !filters.sellerDetails || 
      `level${freelancer.level}` === filters.sellerDetails;

    // Budget filter
    const budgetMatches = (() => {
      if (!filters.budget) return true;
      const price = freelancer.price;
      
      switch (filters.budget) {
        case '0-50':
          return price >= 0 && price <= 50;
        case '50-100':
          return price > 50 && price <= 100;
        case '100+':
          return price > 100;
        default:
          return true;
      }
    })();

    // Delivery time filter
    const deliveryMatches = !filters.deliveryTime || 
      freelancer.deliveryTime <= parseInt(filters.deliveryTime);

    return searchMatches && locationMatches && serviceMatches &&   sellerMatches && budgetMatches && deliveryMatches;
  });
};

// Pure function for sorting freelancers
const sortFreelancers = (freelancers: Freelancer[], sortBy: SortOption): Freelancer[] => {
  const sorted = [...freelancers];
  
  switch (sortBy) {
    case 'mostRated':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'lowestRated':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'highestPrice':
      return sorted.sort((a, b) => b.price - a.price);
    case 'lowestPrice':
      return sorted.sort((a, b) => a.price - b.price);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    case 'mostReviewed':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return sorted;
  }
};

// Main store with devtools for debugging
export const useFreelancerStore = create<FreelancerStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      freelancers: [],
      filteredFreelancers: [],
      filters: INITIAL_FILTERS,
      sortBy: 'mostRated',
      searchTerm: '',
      isLoading: false,
      error: null,

      // Set all freelancers and apply filters/sort
      setFreelancers: (freelancers) => {
        set({ freelancers, error: null });
        get().applyFiltersAndSort();
      },

      // Update filters
      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        }));
        get().applyFiltersAndSort();
      },

      // Clear all filters
      clearFilters: () => {
        set({ 
          filters: INITIAL_FILTERS, 
          searchTerm: '',
          sortBy: 'mostRated'
        });
        get().applyFiltersAndSort();
      },

      // Update sort option
      setSortBy: (sortBy) => {
        set({ sortBy });
        get().applyFiltersAndSort();
      },

      // Update search term
      setSearchTerm: (searchTerm) => {
        set({ searchTerm });
        get().applyFiltersAndSort();
      },
      // Apply filters and sorting (internal method)
      applyFiltersAndSort: () => {
        const { freelancers, filters, sortBy, searchTerm } = get();
        
        try {
          const filtered = filterFreelancers(freelancers, filters, searchTerm);
          const sorted = sortFreelancers(filtered, sortBy);
          
          set({ 
            filteredFreelancers: sorted,
            error: null 
          });
        } catch (error) {
          console.error('Error applying filters and sort:', error);
          set({ 
            error: 'Failed to filter freelancers',
            filteredFreelancers: []
          });
        }
      }
    }),
    {
      name: 'freelancer-store', // For Redux DevTools
    }
  )
);