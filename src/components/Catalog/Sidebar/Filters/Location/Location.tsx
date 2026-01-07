"use client";

import { useState } from "react";
import css from "./Location.module.css";

const Location = () => {
  const [locationName, setLocationName] = useState("");
  const hasValue = locationName.trim().length > 0;

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
          value={locationName || ""}
          onChange={(e) => setLocationName(e.target.value)}
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
