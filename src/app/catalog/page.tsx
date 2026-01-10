import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SearchResult from "@/components/Catalog/SearchResult/SearchResult";
import { fetchCampers } from "@/lib/api";
import { initialState } from "@/lib/store/store";
import CatalogFilters from "@/components/Catalog/Sidebar/Filters/CatalogFilters";
import css from "@/app/catalog/CatalogPage.module.css";

export const generateMetadata = async () => {
  try {
    const data = await fetchCampers(initialState.searchFilters);
    const total = data.total;
    return {
      title: `Catalog`,
      description: `Campervan rental listings - total ${total} options.`,
    };
  } catch (e) {
    // Fallback metadata if API is unavailable
    return {
      title: "Catalog",
      description: "Catalog of camper rentals",
    };
  }
};

const CatalogPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["catalogData", initialState.searchFilters],
    queryFn: () => fetchCampers(initialState.searchFilters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={css.catalogSection}>
        <div className={`${css.catalogLayout} container`}>
          <aside className={`${css.sidebar}`}>
            <CatalogFilters />
          </aside>
          <section className={css.catalogWrapper}>
            <SearchResult />
          </section>
        </div>
      </section>
    </HydrationBoundary>
  );
};

export default CatalogPage;
