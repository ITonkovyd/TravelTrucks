import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SearchResult from "@/components/Catalog/SearchResult/SearchResult";
import { fetchCampers } from "@/lib/api";
import { initialState } from "@/lib/store/store";

export const generateMetadata = async () => {
  try {
    const data = await fetchCampers(initialState.searchFilters);
    const total = data.total;
    return {
      title: `Catalog`,
      description: `Campervan rental listings - total ${total} options.`,
    };
  } catch (e) {
    console.error("Failed to generate metadata for Catalog page", e);
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
      <SearchResult />
    </HydrationBoundary>
  );
};

export default CatalogPage;
