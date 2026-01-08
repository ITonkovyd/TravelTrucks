import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SearchResult from "@/components/Catalog/SearchResult/SearchResult";
import { fetchCampers } from "@/lib/api";

export async function generateMetadata() {
  try {
    const data = await fetchCampers({ page: 1 });
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
}

const CatalogPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["catalogData"],
    queryFn: () => fetchCampers({ page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchResult />
    </HydrationBoundary>
  );
};

export default CatalogPage;
