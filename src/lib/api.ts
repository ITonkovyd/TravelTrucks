import { Camper } from "@/types/camper";
import axios from "axios";
import type { SearchFilters } from "@/lib/store/store";

type CampersResponse = {
  total: number;
  items: Camper[];
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "campers/",
});

export const fetchCampers = async (params: SearchFilters) => {
  const camperEquipment = params.camperEquipment ?? [];

  const equipmentParams = camperEquipment.reduce<Record<string, string>>(
    (acc, key) => {
      acc[key] = key === "transmission" ? "automatic" : "true";
      return acc;
    },
    {}
  );

  const queryParams = {
    limit: 10,
    page: params.page,
    ...(params.city ? { location: params.city } : {}),
    ...(params.form ? { form: params.form } : {}),
    ...equipmentParams,
  };

  const response = await instance.get<CampersResponse>("", {
    params: queryParams,
  });

  return response.data;
};

// export const fetchCamperById = async (camperId: string) => {
//   const response = await instance.get<Camper>(`/${camperId}`);
//   return response.data;
// };