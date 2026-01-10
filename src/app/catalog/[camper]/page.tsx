import type { Metadata } from "next";
import { fetchCamperById } from "@/lib/api";
import { Camper } from "@/types/camper";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CamperDetails from "./CamperDetails.client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ camper: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { camper: id } = await params;
    const camper: Camper = await fetchCamperById(id);

    return {
      title: `${camper.name}`,
      description: camper.description,
      openGraph: {
        title: `${camper.name}`,
        description: camper.description,
        url: `/catalog/${id}`,
        siteName: "TravelTrucks",
        images: [
          {
            url: `${camper.gallery?.at(0)?.original ?? ""}`,
            width: 1200,
            height: 630,
            alt: "TravelTrucks",
          },
        ],
      },
    };
  } catch (e) {
    return {
      title: "Camper Not Found",
      description: "The requested camper could not be found.",
    };
  }
}

export default async function CamperDetailsPage({ params }: Props) {
  const { camper: id } = await params;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["camperDetails", id],
      queryFn: () => fetchCamperById(id),
    });
  } catch (error) {
    console.error("Error fetching camper:", error);
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetails camperId={id} />
    </HydrationBoundary>
  );
}
