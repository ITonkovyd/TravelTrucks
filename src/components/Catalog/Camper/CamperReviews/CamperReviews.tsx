import { CamperReview } from "@/types/camper";
import css from "./CamperReviews.module.css";

type Props = {
  reviews: CamperReview[];
};

const CamperReviews = ({ reviews }: Props) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg key={index} className={css.star} aria-hidden="true" role="img">
        <use
          href={`/icons/sprite.svg#${
            index < rating ? "star_pressed" : "star_default"
          }`}
        ></use>
      </svg>
    ));
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={css.wrapper}>
      {reviews.map((review, index) => (
        <div key={index} className={css.reviewItem}>
          <div className={css.reviewHeader}>
            <div className={css.avatar}>
              {getInitials(review.reviewer_name)}
            </div>
            <div className={css.reviewInfo}>
              <h4 className={css.reviewerName}>{review.reviewer_name}</h4>
              <div className={css.rating}>
                {renderStars(review.reviewer_rating)}
              </div>
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CamperReviews;
