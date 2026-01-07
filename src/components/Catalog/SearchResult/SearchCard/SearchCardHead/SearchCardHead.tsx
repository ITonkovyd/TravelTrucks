import { useState } from "react";
import { formatPrice } from "@/helpers/helpers";
import { CamperReview } from "@/types/camper";
import css from "./SearchCardHead.module.css";

type Props = {
  name: string;
  price: number;
  rating: number;
  reviews: CamperReview[];
  location: string;
};

const Head = ({ name, price, rating, reviews, location }: Props) => {
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const addToFavorites = () => {
    setIsAddedToFavorites(!isAddedToFavorites);
  };

  return (
    <div className={css.head}>
      <div className={css.title}>
        <h2>{name}</h2>
        <div className={css.priceContainer}>
          <span className={css.price}>{formatPrice(price)}</span>
          <svg
            className={css.addToFavorites}
            aria-hidden="true"
            role="img"
            onClick={addToFavorites}
          >
            <use
              href={`/icons/sprite.svg#${isAddedToFavorites ? "heartPressed" : "heart"}`}
            />
          </svg>
        </div>
      </div>
      <div className={css.details}>
        <div className={css.rating}>
          <svg className="svg16" aria-hidden="true" role="img">
            <use href="/icons/sprite.svg#star_pressed"></use>
          </svg>
          {rating && (
            <span className={css.ratingValue}>
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
    </div>
  );
};

export default Head;
