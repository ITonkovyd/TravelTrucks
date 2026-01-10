"use client";


import { useState } from "react";
import { Camper } from "@/types/camper";
import css from "./SearchCard.module.css";
import Image from "next/image";
import SearchCardHead from "./SearchCardHead/SearchCardHead";
import { getCamperEquipment } from "@/helpers/helpers";
import SearchCardEquips from "./SearchCardEquips/SearchCardEquips";
import Link from "next/link";
import useCampersStore from "@/lib/store/store";

type Props = {
  camper: Camper;
};

const SearchCard = ({ camper }: Props) => {
  const camperEquipment = getCamperEquipment(camper);
  const favoriteCampers = useCampersStore((state) => state.favoriteCampers);
  const addToFavorites = useCampersStore((state) => state.addFavoriteCamper);
  const removeFromFavorites = useCampersStore(
    (state) => state.removeFavoriteCamper
  );
  const isFavorite = favoriteCampers.some((c) => c.id === camper.id);

  const handleToggleFavorite = () => {
    if (favoriteCampers.length === 0 || !isFavorite) {
      addToFavorites(camper);
    } else {
      removeFromFavorites(camper.id);
    }
  };

  return (
    <li className={css.card}>
      <Image
        src={camper.gallery[0].thumb}
        alt={camper.name}
        width={292}
        height={320}
        className={css.image}
        loading="eager"
      />
      <div className={css.mainInfo}>
        <SearchCardHead
          name={camper.name}
          price={camper.price}
          rating={camper.rating}
          reviews={camper.reviews}
          location={camper.location}
          handleToggle={handleToggleFavorite}
          isFavorite={isFavorite}
        />

        <div className={css.description}>{camper.description}</div>

        {camperEquipment.length > 0 && (
          <SearchCardEquips equips={camperEquipment} />
        )}

        <Link
          href={`/catalog/${camper.id}`}
          className={`${css.viewDetailsButton} button button--primary`}
        >
          Show more
        </Link>
      </div>
    </li>
  );
};

export default SearchCard;
