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
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return Array.from(next);
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
        />
      </div>
      <input type="hidden" name="equipment" value={selectedArray.join(",")} />
    </fieldset>
  );
};

export default VehicleType;
