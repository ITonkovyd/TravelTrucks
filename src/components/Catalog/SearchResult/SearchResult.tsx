"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCampers } from "@/lib/api";
import { ThreeCircles } from "react-loader-spinner";
import css from "./SearchResult.module.css";
import Camper from "@/types/camper";
import SearchCard from "./SearchCard/SearchCard";

const SearchResult = () => {
  const {
    data: campers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["catalogData"],
    queryFn: () => fetchCampers(),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#999"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  }

  if (error) {
    return <div>Error loading search results.</div>;
  }

  return (
    <ul className={css.list}>
      {campers?.map((camper: Camper) => (
        <SearchCard key={camper.id} camper={camper} />
      ))}
    </ul>
  );
};

export default SearchResult;
