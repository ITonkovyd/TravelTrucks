import { Camper } from "@/types/camper";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SearchFilters = {
  city?: string;
  camperEquipment?: string[];
  form?: string;
  page: number;
  limit?: number;
};

type State = {
  searchFilters: SearchFilters;
  activeSearchFilters: SearchFilters;
  campersList: Camper[];
  favoriteCampers: Camper[];
};

type Action = {
  setSearchFilters: (params: Partial<SearchFilters>) => void; // draft
  setActiveSearchFilters: (params: SearchFilters) => void;
  setSearchFilterArray: (key: keyof SearchFilters, value: string) => void;
  hydrateCampers: (items: Camper[]) => void;
  resetCampersList: () => void;
  addFavoriteCamper: (camper: Camper) => void;
  removeFavoriteCamper: (camperId: string) => void;
};

export const initialState: State = {
  searchFilters: {
    city: "",
    camperEquipment: [],
    form: "",
    page: 1,
    limit: 10,
  },

  activeSearchFilters: {
    city: "",
    camperEquipment: [],
    form: "",
    page: 1,
  },
  campersList: [],
  favoriteCampers: [],
};

const useCampersStore = create<State & Action>()(
  persist(
    (set) => ({
      ...initialState,

      setSearchFilters: (filters) =>
        set((state) => ({
          searchFilters: {
            ...state.searchFilters,
            ...filters,
          },
        })),

      setActiveSearchFilters: (filters) =>
        set(() => ({
          activeSearchFilters: { ...filters },
        })),

      resetCampersList: () => set(() => ({ campersList: [] })),

      setSearchFilterArray: (key, value) =>
        set((state) => ({
          searchFilters: {
            ...state.searchFilters,
            [key]: Array.isArray(state.searchFilters[key])
              ? state.searchFilters[key].includes(value)
                ? state.searchFilters[key].filter((v: string) => v !== value)
                : [...state.searchFilters[key], value]
              : [value],
          },
        })),

      hydrateCampers: (items) =>
        set((state) => ({
          campersList: [
            ...state.campersList,
            ...items.filter(
              (item) => !state.campersList.some((c) => c.id === item.id)
            ),
          ],
        })),

      addFavoriteCamper: (camper) =>
        set((state) => ({
          favoriteCampers: state.favoriteCampers.some((c) => c.id === camper.id)
            ? state.favoriteCampers
            : [...state.favoriteCampers, camper],
        })),

      removeFavoriteCamper: (camperId) =>
        set((state) => ({
          favoriteCampers: state.favoriteCampers.filter(
            (camper) => camper.id !== camperId
          ),
        })),
    }),
    {
      name: "campers-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favoriteCampers: state.favoriteCampers,
      }),

      version: 1,
    }
  )
);

export default useCampersStore;
