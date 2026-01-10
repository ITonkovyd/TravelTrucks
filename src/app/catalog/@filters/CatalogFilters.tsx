"use client";

import Filters from "@/components/Catalog/Sidebar/Filters/Filters";
import Location from "@/components/Catalog/Sidebar/Filters/Location/Location";
import { useState } from "react";

const CatalogFilters = () => {
  const [city, setCity] = useState("");
  const [camperEquipment, setCamperEquipment] = useState<string[]>([]);
  const [form, setForm] = useState("");

  return (
    <>
      <Location value={city} onChange={setCity} />
      <Filters
        city={city}
        setCity={setCity}
        camperEquipment={camperEquipment}
        setCamperEquipment={setCamperEquipment}
        form={form}
        setForm={setForm}
      />
    </>
  );
};

export default CatalogFilters;
