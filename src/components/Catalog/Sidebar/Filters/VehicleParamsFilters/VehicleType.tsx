"use client";

import { VEHICLE_TYPES } from "../../static";
import css from "./VehicleParamsFilters.module.css";

type Props = {
  selected: string;
  onChange: (key: string) => void;
};

const VehicleType = ({ selected, onChange }: Props) => {
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
                onChange={() => onChange(type.key)}
                onClick={() => onChange(type.key)}
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
