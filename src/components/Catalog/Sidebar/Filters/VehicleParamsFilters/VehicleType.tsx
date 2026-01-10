"use client";

import { VEHICLE_TYPES } from "../../static";
import css from "./VehicleParamsFilters.module.css";
import useCampersStore from "@/lib/store/store";

type VehicleType = {
  key: string;
  label: string;
  icon: string;
};

const VehicleType = () => {
  const setSearchFilters = useCampersStore((state) => state.setSearchFilters);
  const resetCampersList = useCampersStore((state) => state.resetCampersList);
  const selected = useCampersStore((state) => state.searchFilters.form);

  const handleSelect = (type: VehicleType) => {
    resetCampersList();
    if (selected === type.key) {
      setSearchFilters({ form: "", page: 1 });
      return;
    }
    setSearchFilters({ form: type.key, page: 1 });
  };

  return (
    <fieldset className={css.group}>
      <legend className={css.title}>Vehicle types</legend>
      <div className="separator" />
      <div className={css.grid}>
        {VEHICLE_TYPES.map((type) => {
          const id = `type-${type.key}`;
          return (
            <label key={type.key} className="oc" htmlFor={id}>
              <input
                id={id}
                className="oc-input"
                type="radio"
                name="type"
                value={type.key}
                checked={selected === type.key}
                onChange={() => handleSelect(type)}
                onClick={() => handleSelect(type)}
              />
              <span className="oc-card" aria-hidden="true">
                <svg className="oc-icon">
                  <use href={`/icons/sprite.svg#${type.icon}`}></use>
                </svg>
                <span className="oc-text">{type.label}</span>
              </span>
            </label>
          );
        })}
      </div>
      <input type="hidden" name="type" value={selected} />
    </fieldset>
  );
};

export default VehicleType;
