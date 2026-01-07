"use client";
import React, { useMemo } from "react";
import { FilterCheckboxesParams } from "./types";

interface FilterCheckboxesGridProps {
  filters: FilterCheckboxesParams;
  onToggle?: (key: string) => void;
  selected?: string[];
  single?: boolean;
  name?: string;
}

const FilterCheckboxesGrid = ({
  filters,
  onToggle,
  selected = [],
  single = false,
  name,
}: FilterCheckboxesGridProps) => {
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  return (
    <>
      {filters.map((equip) => {
        const id = `equip-${equip.key}`;
        return (
          <label key={equip.key} className="oc" htmlFor={id}>
            <input
              id={id}
              className="oc-input"
              type={single ? "radio" : "checkbox"}
              name={single ? (name ?? "filter-single") : undefined}
              checked={selectedSet.has(equip.key)}
              onChange={() => !single && onToggle && onToggle(equip.key)}
              onClick={() => single && onToggle && onToggle(equip.key)}
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
    </>
  );
};

export default React.memo(FilterCheckboxesGrid);
