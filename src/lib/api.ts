import { CampersResponse } from "@/types/camper";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "campers/",
  params: {
    limit: 10,
  },
});

export const fetchCampers = async ({ page }: { page: number }) => {
  const response = await instance.get<CampersResponse>("", {
    params: { page },
  });
  return response.data;
};
