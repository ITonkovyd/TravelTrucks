"use client";

import css from "./Location.module.css";
import { useState, useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Location = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const hasValue = inputValue.trim() !== "";

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
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
          }}
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
