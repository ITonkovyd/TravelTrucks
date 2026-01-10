"use client";

import { useEffect } from "react";
import useCampersStore from "@/lib/store/store";
import { useQuery } from "@tanstack/react-query";
import { fetchCampers } from "@/lib/api";
import { ThreeCircles } from "react-loader-spinner";
import css from "./SearchResult.module.css";
import { Camper } from "@/types/camper";
import SearchCard from "./SearchCard/SearchCard";

const ITEMS_PER_PAGE = 10;

const SearchResult = () => {
  const hydrateCampers = useCampersStore((state) => state.hydrateCampers);
  const setSearchFilters = useCampersStore((state) => state.setSearchFilters);
  const campersList = useCampersStore((state) => state.campersList);
  const searchFilters = useCampersStore((state) => state.searchFilters);

  console.log(searchFilters);

  const { data, isLoading, error } = useQuery({
    queryKey: ["catalogData", searchFilters],
    queryFn: () => fetchCampers(searchFilters),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data) {
      hydrateCampers(data.items);
    }
  }, [data, hydrateCampers]);

  return (
    <section className={css.searchResult}>
      {campersList && campersList.length > 0 && (
        <>
          <ul className={css.list}>
            {campersList.map((camper: Camper) => (
              <SearchCard key={camper.id} camper={camper} />
            ))}
          </ul>
        </>
      )}

      {isLoading ? (
        <ThreeCircles
          visible={true}
          height="80"
          width="80"
          color="#666"
          ariaLabel="three-circles-loading"
          wrapperClass={css.loaderOverlay}
        />
      ) : (
        <button
          className="button button--secondary"
          onClick={() => setSearchFilters({ page: searchFilters.page + 1 })}
          disabled={searchFilters.page * ITEMS_PER_PAGE >= (data?.total || 0)}
        >
          Load more
        </button>
      )}

      {error && <div>Error loading search results.</div>}
    </section>
  );
};

export default SearchResult;
