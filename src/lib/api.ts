import Camper from "@/types/camper";
import axios from "axios";

interface ResponseData {
  total: number;
  items: Camper[];
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "campers/",
});

export const fetchCampers = async () => {
  const response = await instance.get<ResponseData>("");
  return response.data.items;
};
