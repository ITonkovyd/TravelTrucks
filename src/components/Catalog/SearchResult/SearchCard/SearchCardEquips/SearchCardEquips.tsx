import css from "./SearchCardEquips.module.css";

type Props = {
  equips: string[];
};

const SearchCardEquips = ({ equips }: Props) => {
  return (
    <div className={css.equips}>
      {equips.map((equip) => (
        <div key={equip} className={css.equipBadge}>
          <svg className="svg20" aria-hidden="true" role="img">
            <use href={`/icons/sprite.svg#${equip}`}></use>
          </svg>
          <span className="equipItem">
            {equip.charAt(0).toUpperCase() + equip.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SearchCardEquips;
