import { Camper } from "@/types/camper";

export const formatPrice = (price: number): string => {
  return `€${price.toFixed(2)}`;
};

export const getCamperEquipment = (camper: Camper): (keyof Camper)[] => {
  return (Object.keys(camper) as (keyof Camper)[]).filter(
    (key) => camper[key] === true
  );
};
