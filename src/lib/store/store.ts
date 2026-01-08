import { Camper } from "@/types/camper";
import { create } from "zustand";
import { fetchCampers } from "@/lib/api";

const ITEMS_PER_PAGE = 10;

type SearchFilters = {
  city?: string;
  camperEquipment?: string[];
  camperBodyType?: string[];
  page: number;
};

type State = {
  searchFilters: SearchFilters;
  campersList: Camper[];
  favoriteCampers: Camper[];
};

type Action = {
  setSearchFilters: (params: Partial<SearchFilters>) => void;
  hydrateCampers: (items: Camper[]) => void;
  toggleFavoriteCamper: (camper: Camper) => void;
};

const initialState: State = {
  searchFilters: {
    city: "",
    camperEquipment: [],
    camperBodyType: [],
    page: 1,
  },
  campersList: [],
  favoriteCampers: [],
};

const useCampersStore = create<State & Action>((set) => ({
  ...initialState,

  setSearchFilters: (filters) =>
    set((state) => ({
      searchFilters: {
        ...state.searchFilters,
        ...filters,
      },
    })),

  hydrateCampers: (items: Camper[]) =>
    set((state: State) => ({
      campersList: [...state.campersList, ...items],
    })),

  toggleFavoriteCamper: (camper) =>
    set((state) => {
      const isFavorite = state.favoriteCampers.some((c) => c.id === camper.id);

      return {
        favoriteCampers: isFavorite
          ? state.favoriteCampers.filter((c) => c.id !== camper.id)
          : [...state.favoriteCampers, camper],
      };
    }),
}));

export default useCampersStore;
