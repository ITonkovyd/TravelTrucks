"use client";
import React, { useMemo } from "react";
import { FilterCheckboxesParams } from "./types";

interface FilterCheckboxesGridProps {
  filters: FilterCheckboxesParams;
  onToggle?: (key: string) => void;
  selected?: string[];
}

const FilterCheckboxesGrid = ({
  filters,
  onToggle,
  selected = [],
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
              type="checkbox"
              checked={selectedSet.has(equip.key)}
              onChange={() => onToggle && onToggle(equip.key)}
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
