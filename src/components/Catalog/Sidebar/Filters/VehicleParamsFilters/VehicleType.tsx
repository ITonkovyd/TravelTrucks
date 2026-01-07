"use client";

import { useCallback, useMemo, useState } from "react";
import { VEHICLE_TYPES } from "../../static";
import css from "./VehicleParamsFilters.module.css";
import FilterCheckboxesGrid from "../FilterCheckboxesGrid";

const VehicleType = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const selectedArray = useMemo(() => Array.from(selected), [selected]);

  const toggle = useCallback((key: string) => {
    setSelected((prev) => {
      if (prev.length === 1 && prev[0] === key) return [];
      return [key];
    });
  }, []);

  return (
    <fieldset className={css.group}>
      <legend className={css.title}>Vehicle types</legend>
      <div className="separator" />
      <div className={css.grid}>
        <FilterCheckboxesGrid
          filters={VEHICLE_TYPES}
          onToggle={toggle}
          selected={selected}
          single
          name="type"
        />
      </div>
      <input type="hidden" name="type" value={selectedArray.join(",")} />
    </fieldset>
  );
};

export default VehicleType;
