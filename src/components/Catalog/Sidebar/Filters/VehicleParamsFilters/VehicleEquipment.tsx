"use client";

import { VEHICLE_EQUIPS } from "../../static";
import css from "./VehicleParamsFilters.module.css";
import useCampersStore from "@/lib/store/store";

const VehicleEquipment = () => {
  const selected =
    useCampersStore((state) => state.searchFilters.camperEquipment) || [];
  const setSearchFilterArray = useCampersStore((state) => state.setSearchFilterArray);
  const setSearchFilters = useCampersStore((state) => state.setSearchFilters);
  const resetCampersList = useCampersStore((state) => state.resetCampersList);

  const handleFilterChange = (key: string) => {
    resetCampersList();
    setSearchFilters({ page: 1 });
    setSearchFilterArray("camperEquipment", key);
  };

  return (
    <fieldset className={css.group}>
      <legend className={css.title}>Vehicle equipment</legend>
      <div className="separator" />
      <div className={css.grid}>
        {VEHICLE_EQUIPS.map((equip) => {
          const id = `equip-${equip.key}`;
          return (
            <label key={equip.key} className="oc" htmlFor={id}>
              <input
                id={id}
                className="oc-input"
                type="checkbox"
                name="equipment"
                value={equip.key}
                checked={selected.includes(equip.key)}
                onChange={() => handleFilterChange(equip.key)}
              />
              <span className="oc-card" aria-hidden="true">
                <svg className="oc-icon">
                  <use href={`/icons/sprite.svg#${equip.icon}`}></use>
                </svg>
                <span className="oc-text">{equip.label}</span>
              </span>
            </label>
          );
        })}
      </div>
      <input type="hidden" name="equipment" value={selected.join(",")} />
    </fieldset>
  );
};

export default VehicleEquipment;
