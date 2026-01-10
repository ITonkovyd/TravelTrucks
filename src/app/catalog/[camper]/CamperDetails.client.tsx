"use client";

import { useState } from "react";
import CamperGallery from "@/components/Catalog/Camper/CamperGallery/CamperGallery";
import CamperHead from "@/components/Catalog/Camper/CamperHead/CamperHead";
import css from "./CamperDetails.module.css";
import BookingForm from "@/components/Catalog/Camper/BookingForm/BookingForm";
import CamperFeatures from "@/components/Catalog/Camper/CamperFeatures/CamperFeatures";
import CamperReviews from "@/components/Catalog/Camper/CamperReviews/CamperReviews";
import { CamperForm } from "@/types/camper";

const CAMPER = {
  id: "1",
  name: "Road Bear C 23-25",
  price: 10000,
  rating: 4.5,
  location: "Ukraine, Kyiv",
  description:
    "Embadventures, promising comfort, style, and the freedom to explore at your own pace.",
  form: "alcove" as CamperForm,
  length: "7.3m",
  width: "2.65m",
  height: "3.65m",
  tank: "208l",
  consumption: "30l/100km",
  transmission: "automatic",
  engine: "diesel",
  AC: true,
  bathroom: true,
  kitchen: false,
  TV: true,
  radio: true,
  refrigerator: false,
  microwave: true,
  gas: false,
  water: true,
  gallery: [
    {
      thumb: "https://ftp.goit.study/img/campers-test-task/1-1.webp",
      original: "https://ftp.goit.study/img/campers-test-task/1-1.webp",
    },
    {
      thumb: "https://ftp.goit.study/img/campers-test-task/1-2.webp",
      original: "https://ftp.goit.study/img/campers-test-task/1-2.webp",
    },
    {
      thumb: "https://ftp.goit.study/img/campers-test-task/1-3.webp",
      original: "https://ftp.goit.study/img/campers-test-task/1-3.webp",
    },
  ],
  reviews: [
    {
      reviewer_name: "Alice",
      reviewer_rating: 5,
      comment:
        "Exceptional RV! The Road Bear C 23-25 provided a comfortable and enjoyable journey for my family. The amenities were fantastic, and the space was well-utilized. Highly recommended!",
    },
    {
      reviewer_name: "Bob",
      reviewer_rating: 4,
      comment:
        "Great RV for a road trip. Spacious and well-equipped. Only minor issues with the bathroom setup, but overall a wonderful experience.",
    },
  ],
};

const CamperDetails = () => {
  const [selectedSection, setSelectedSection] = useState("Features");
  const sectionsList = ["Features", "Reviews"];

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
