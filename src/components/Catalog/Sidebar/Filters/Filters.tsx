import css from "./Filters.module.css";
import VehicleEquipment from "./VehicleParamsFilters/VehicleEquipment";
import VehicleType from "./VehicleParamsFilters/VehicleType";

const Filters = () => {
  return (
    <div className={css.filters}>
      <div className={css.filtersTitle}>Filters</div>
      <VehicleEquipment />
      <VehicleType />

      <button
        type="submit"
        className={`${css.searchButton} button button--primary`}
      >
        Search
      </button>
    </div>
  );
};

export default Filters;
