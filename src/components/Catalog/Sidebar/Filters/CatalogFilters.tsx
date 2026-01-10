"use client";

import Filters from "./Filters";
import Location from "../Filters/Location/Location";
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
