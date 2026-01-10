import css from "./CamperHead.module.css";
import { formatPrice } from "@/helpers/helpers";
import { CamperReview } from "@/types/camper";

type Props = {
  name: string;
  price: number;
  rating: number;
  reviews: CamperReview[];
  location: string;
  onReviewsClick: () => void;
};

const CamperHead = ({
  name,
  rating,
  reviews,
  location,
  price,
  onReviewsClick,
}: Props) => {
  return (
    <div className={css.head}>
      <h2 className={css.title}>{name}</h2>
      <div className={css.details}>
        <div className={css.rating}>
          <svg className="svg16" aria-hidden="true" role="img">
            <use href="/icons/sprite.svg#star_pressed"></use>
          </svg>
          {rating && (
            <span onClick={onReviewsClick} className={css.ratingValue}>
              {rating}
              {reviews.length > 0 && <span>({reviews.length} Reviews)</span>}
            </span>
          )}
        </div>
        <span className={css.location}>
          <svg className="svg16" aria-hidden="true" role="img">
            <use href="/icons/sprite.svg#map"></use>
          </svg>
          <span>{location}</span>
        </span>
      </div>
      <span className={css.price}>{formatPrice(price)}</span>
    </div>
  );
};

export default CamperHead;
