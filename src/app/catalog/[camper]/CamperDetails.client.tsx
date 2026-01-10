"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCamperById } from "@/lib/api";
import { ThreeCircles } from "react-loader-spinner";
import CamperGallery from "@/components/Catalog/Camper/CamperGallery/CamperGallery";
import CamperHead from "@/components/Catalog/Camper/CamperHead/CamperHead";
import css from "./CamperDetails.module.css";
import BookingForm from "@/components/Catalog/Camper/BookingForm/BookingForm";
import CamperFeatures from "@/components/Catalog/Camper/CamperFeatures/CamperFeatures";
import CamperReviews from "@/components/Catalog/Camper/CamperReviews/CamperReviews";

type Props = {
  camperId: string;
};

const CamperDetails = ({ camperId }: Props) => {
  const [selectedSection, setSelectedSection] = useState("Features");
  const sectionsList = ["Features", "Reviews"];

  const {
    data: CAMPER,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["camperDetails", camperId],
    queryFn: () => fetchCamperById(camperId),
    retry: (failureCount, error: any) => {
      // Не retry для 404 або 429
      if (error?.response?.status === 404 || error?.response?.status === 429) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const goToReviews = () => {
    setSelectedSection("Reviews");
    const reviewsSection = document.querySelector(`.${css.overview}`);
    if (reviewsSection) {
      const yOffset = -50;
      const y =
        reviewsSection.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section>
        <div className={`container ${css.loaderContainer}`}>
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            color="#666"
            ariaLabel="three-circles-loading"
          />
        </div>
      </section>
    );
  }

  if (error || !CAMPER) {
    const is429Error = (error as any)?.response?.status === 429;
    return (
      <section>
        <div className={`container ${css.errorContainer}`}>
          <h2 className={css.errorTitle}>
            {is429Error ? "Too Many Requests" : "Camper not found"}
          </h2>
          <p className={css.errorMessage}>
            {is429Error
              ? "Please wait a moment and try again. The server is rate limiting requests."
              : "The camper you are looking for does not exist."}
          </p>
          {is429Error && (
            <button
              onClick={() => window.location.reload()}
              className="button button--primary"
            >
              Try Again
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <CamperHead
          name={CAMPER.name}
          price={CAMPER.price}
          rating={CAMPER.rating}
          reviews={CAMPER.reviews}
          location={CAMPER.location}
          onReviewsClick={goToReviews}
        />
        <CamperGallery
          gallery={CAMPER.gallery}
          description={CAMPER.description}
        />

        <div className={css.sectionsSeparator}>
          {sectionsList.map((section) => (
            <h3
              key={section}
              className={`${css.sectionLabel} ${selectedSection === section ? css.activeSection : ""}`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </h3>
          ))}
        </div>
        <div className={css.overview}>
          <div className={css.overviewSectionWrapper}>
            {selectedSection === "Features" && (
              <CamperFeatures
                equips={{
                  AC: CAMPER.AC,
                  bathroom: CAMPER.bathroom,
                  kitchen: CAMPER.kitchen,
                  TV: CAMPER.TV,
                  radio: CAMPER.radio,
                  refrigerator: CAMPER.refrigerator,
                  microwave: CAMPER.microwave,
                  gas: CAMPER.gas,
                  water: CAMPER.water,
                }}
                details={{
                  form: CAMPER.form,
                  length: CAMPER.length,
                  width: CAMPER.width,
                  height: CAMPER.height,
                  tank: CAMPER.tank,
                  consumption: CAMPER.consumption,
                }}
              />
            )}
            {selectedSection === "Reviews" && (
              <CamperReviews reviews={CAMPER.reviews} />
            )}
          </div>
          <div>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CamperDetails;
