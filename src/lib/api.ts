import { Camper } from "@/types/camper";
import axios from "axios";
import { SearchFilters } from "@/lib/store/store";

type CampersResponse = {
  total: number;
  items: Camper[];
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "campers/",
});

// Retry logic for rate limiting
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        if (i < maxRetries - 1) {
          const delay = baseDelay * Math.pow(2, i);
          await wait(delay);
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}

export const fetchCampers = async (params: SearchFilters) => {
  return withRetry(async () => {
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
  });
};

export const fetchCamperById = async (camperId: string) => {
  return withRetry(async () => {
    const response = await instance.get<Camper>(`${camperId}`);
    return response.data;
  });
};