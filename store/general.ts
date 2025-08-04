// src/store/crud.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CrudState {
  categoriesDrawer: boolean;
  categories: any;
  countries: { name: string; shortName: string; dialCode: string }[];
  mainLoader: boolean;
  trader: null | any;
  settings: null | any;
  notificationsModal: boolean;
  offersModal: boolean;
}

const initialState: CrudState = {
  categoriesDrawer: false,
  categories: [],
  countries: [],
  mainLoader: true,
  trader: null,
  settings: null,
  notificationsModal: false,
  offersModal: true,
};

// Slice
const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    toggleCategoriesDrawer: (state, action: PayloadAction<any>) => {
      state.categoriesDrawer = action.payload;
    },
    setCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
    },
    setSettings: (state, action: PayloadAction<any>) => {
      state.settings = action.payload;
    },
    setCountries: (state, action: PayloadAction<any>) => {
      state.countries = action.payload;
    },
    setSelectedTrader: (state, action: PayloadAction<any>) => {
      state.trader = action.payload;
    },
    setLoader: (state, action: PayloadAction<any>) => {
      state.mainLoader = action.payload;
    },
    setNotificationsModal: (state, action: PayloadAction<any>) => {
      state.notificationsModal = action.payload;
    },
    setOffersModal: (state, action: PayloadAction<any>) => {
      state.offersModal = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  toggleCategoriesDrawer,
  setCategories,
  setLoader,
  setCountries,
  setSettings,
  setSelectedTrader,
  setNotificationsModal,
  setOffersModal
} = generalSlice.actions;

export default generalSlice.reducer;
