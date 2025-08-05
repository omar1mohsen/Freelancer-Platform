// src/store/useFreelancerStore.ts
import { create } from 'zustand';
import { Freelancer, FilterState, SortOption } from '@/types';

interface FreelancerStore {
  freelancers: Freelancer[];
  filteredFreelancers: Freelancer[];
  filters: FilterState;
  sortBy: SortOption;
  searchTerm: string;

  setFreelancers: (freelancers: Freelancer[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSearchTerm: (term: string) => void;
  searchFreelancers: () => void;
  applyFiltersAndSort: () => void;
}

const initialFilters: FilterState = {
  serviceOptions: '',
  sellerDetails: '',
  budget: '',
  deliveryTime: '',
  location: '',
  sortBy: 'mostRated'
};

export const useFreelancerStore = create<FreelancerStore>((set, get) => ({
  freelancers: [],
  filteredFreelancers: [],
  filters: initialFilters,
  sortBy: 'mostRated',
  searchTerm: '',

  setFreelancers: (freelancers) => {
    set({ freelancers });
    get().applyFiltersAndSort();
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().applyFiltersAndSort();
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().applyFiltersAndSort();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().applyFiltersAndSort();
  },

  searchFreelancers: () => {
    get().applyFiltersAndSort();
  },

  applyFiltersAndSort: () => {
    const { freelancers, filters, sortBy, searchTerm } = get();
    let filtered = [...freelancers];

    if (searchTerm) {
      filtered = filtered.filter((freelancer) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          freelancer.name.toLowerCase().includes(searchLower) ||
          freelancer.role.toLowerCase().includes(searchLower) 
        );
      });
    }

    // Location Filter
    if (filters.location) {
      filtered = filtered.filter(f =>
        f.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case 'mostRated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowestRated':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'highestPrice':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'lowestPrice':
        filtered.sort((a, b) => a.price - b.price);
        break;
    }
    set({ filteredFreelancers: filtered });
  }
}));
