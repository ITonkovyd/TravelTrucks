import { CamperGalleryItem } from "@/types/camper";
import Image from "next/image";
import css from "./CamperGallery.module.css";

type Props = {
  gallery: CamperGalleryItem[];
  description: string;
};

const CamperGallery = ({ gallery, description }: Props) => {
  return (
    <div className={css.gallery}>
      {gallery.length > 0 && (
        <div className={css.imagesWrapper}>
          {gallery.map((image) => (
            <Image
              key={image.original}
              src={image.original}
              width={312}
              height={312}
              alt={description}
              className={css.image}
            />
          ))}
        </div>
      )}
      <p className={css.description}>{description}</p>
    </div>
  );
};

export default CamperGallery;
