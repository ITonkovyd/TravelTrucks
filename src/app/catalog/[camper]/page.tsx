import type { Metadata } from "next";
// import { fetchCamperById } from "@/lib/api";
import { Camper } from "@/types/camper";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CamperDetails from "./CamperDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params;
//   const camper: Camper = await fetchCamperById(id);

//   return {
//     title: `${camper.name}`,
//     description: camper.description,
//     openGraph: {
//       title: `${camper.name}`,
//       description: camper.description,
//       url: `/campers/${id}`,
//       siteName: "TravelTrucks",
//       images: [
//         {
//           url: `${camper.gallery?.at(0)?.original ?? ""}`,
//           width: 1200,
//           height: 630,
//           alt: "TravelTrucks",
//         },
//       ],
//     },
//   };
// }

export default async function CamperDetailsPage({ params }: Props) {
  // const { id } = await params;
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["catalogData", id],
  //   queryFn: () => fetchCamperById(id),
  // });

  // return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>;
  return (
    <>
      <CamperDetails />
    </>
  );
}
