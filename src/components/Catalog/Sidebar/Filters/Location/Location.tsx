"use client";

import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import css from "./Location.module.css";
import useCampersStore from "@/lib/store/store";

const Location = () => {
  const setLocationName = useCampersStore((state) => state.setSearchFilters);
  const locationName =
    useCampersStore((state) => state.searchFilters.city) || "";
  const [value, setValue] = useState(locationName);
  const [city] = useDebounce(
    value.charAt(0).toUpperCase() + value.slice(1),
    300
  );
  const hasValue = value.trim().length > 0;
  const filtersList = useCampersStore((state) => state.searchFilters);
  console.log(filtersList);

  useEffect(() => {
    setLocationName({ city });
  }, [city, setLocationName]);

  return (
    <div className={css.location}>
      <span className={css.labelText}>Location</span>
      <form action="" className={css.form}>
        <input
          className={`${css.inputField} inputField`}
          name="location"
          id="location"
          type="text"
          placeholder="City"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label
          htmlFor="location"
          className={`${css.label} ${hasValue ? css.active : ""}`}
        >
          <svg className={css.icon}>
            <use href="/icons/sprite.svg#map"></use>
          </svg>
        </label>
      </form>
    </div>
  );
};

export default Location;
