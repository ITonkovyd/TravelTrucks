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
  const activeSearchFilters = useCampersStore(
    (state) => state.activeSearchFilters
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["catalogData", activeSearchFilters],
    queryFn: () => fetchCampers(activeSearchFilters),
    enabled: false,
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

      {!isLoading && !error && (
        <button
          className="button button--secondary"
          onClick={() => {
            setSearchFilters({ page: activeSearchFilters.page + 1 });
            refetch();
          }}
          disabled={
            activeSearchFilters.page * ITEMS_PER_PAGE >= (data?.total || 0)
          }
        >
          Load more
        </button>
      )}

      {isLoading && (
        <ThreeCircles
          visible={true}
          height="80"
          width="80"
          color="#666"
          ariaLabel="three-circles-loading"
          wrapperClass={css.loaderOverlay}
        />
      )}

      {error && (
        <div>
          Error loading search results. Try to change filters and search again.
        </div>
      )}
    </section>
  );
};

export default SearchResult;
