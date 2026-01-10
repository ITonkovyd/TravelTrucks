import { Camper } from "@/types/camper";
import { getCamperEquipment } from "@/helpers/helpers";
import css from "./CamperFeatures.module.css";

type CamperEquips = Partial<
  Pick<
    Camper,
    | "AC"
    | "bathroom"
    | "kitchen"
    | "TV"
    | "radio"
    | "refrigerator"
    | "microwave"
    | "gas"
    | "water"
  >
>;

type CamperDetails = Pick<
  Camper,
  "form" | "length" | "width" | "height" | "tank" | "consumption"
>;

type Props = {
  equips: CamperEquips;
  details: CamperDetails;
};

const equipmentLabels: Record<string, string> = {
  AC: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  TV: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

const CamperFeatures = ({ equips, details }: Props) => {
  const equipment = getCamperEquipment(equips as Camper);

  const detailsMap: Record<string, string> = {
    form: "Form",
    length: "Length",
    width: "Width",
    height: "Height",
    tank: "Tank",
    consumption: "Consumption",
  };

  return (
    <div className={css.wrapper}>
      <div className={css.equipsList}>
        {equipment.map((key) => (
          <div key={key} className={css.equipBadge}>
            <svg className={css.icon} aria-hidden="true" role="img">
              <use href={`/icons/sprite.svg#${key}`}></use>
            </svg>
            <span className={css.equipLabel}>
              {equipmentLabels[key] || key}
            </span>
          </div>
        ))}
      </div>

      <div className={css.detailsSection}>
        <h3 className={css.detailsTitle}>Vehicle details</h3>
        <div className="separator" />
        <div className={css.detailsList}>
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className={css.detailItem}>
              <span className={css.detailLabel}>{detailsMap[key]}</span>
              <span className={css.detailValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CamperFeatures;
