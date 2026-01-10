"use client";

import css from "./Filters.module.css";
import VehicleEquipment from "./VehicleParamsFilters/VehicleEquipment";
import VehicleType from "./VehicleParamsFilters/VehicleType";
import useCampersStore from "@/lib/store/store";

type Props = {
  city: string;
  setCity: (value: string) => void;
  camperEquipment: string[];
  setCamperEquipment: (value: string[]) => void;
  form: string;
  setForm: (value: string) => void;
};

const Filters = ({
  city,
  camperEquipment,
  setCamperEquipment,
  form,
  setForm,
}: Props) => {
  const setActiveSearchFilters = useCampersStore(
    (state) => state.setActiveSearchFilters
  );
  const resetCampersList = useCampersStore((state) => state.resetCampersList);

  const handleEquipmentChange = (key: string) => {
    setCamperEquipment(
      camperEquipment.includes(key)
        ? camperEquipment.filter((v) => v !== key)
        : [...camperEquipment, key]
    );
  };

  const handleTypeChange = (key: string) => {
    setForm(form === key ? "" : key);
  };

  const handleSearch = () => {
    resetCampersList();
    setActiveSearchFilters({
      city: city || "",
      camperEquipment: camperEquipment || [],
      form: form || "",
      page: 1,
      limit: 10,
    });
  };

  return (
    <div className={css.filters}>
      <div className={css.filtersTitle}>Filters</div>
      <VehicleEquipment
        selected={camperEquipment}
        onChange={handleEquipmentChange}
      />
      <VehicleType selected={form} onChange={handleTypeChange} />
      <button
        type="button"
        className="button button--primary"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Filters;
