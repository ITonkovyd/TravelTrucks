import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SearchResult from "@/components/Catalog/SearchResult/SearchResult";
import { fetchCampers } from "@/lib/api";

export async function generateMetadata() {
  try {
    const data = await fetchCampers();
    const total = data?.length || 0;
    return {
      title: `Каталог — ${total} оголошень`,
      description: `Оголошення автодомів для оренди — знайдено ${total} варіантів.`,
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
    queryFn: () => fetchCampers(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchResult />
    </HydrationBoundary>
  );
};

export default CatalogPage;
