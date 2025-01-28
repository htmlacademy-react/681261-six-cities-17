import { MAX_GALLERY_IMAGES } from '../../constant.ts';

type OfferGalleryProps = {
  images: string[];
}

export default function OfferGallery({ images }: OfferGalleryProps) {
  return (
    <div className="offer__gallery">
      {images.slice(0, MAX_GALLERY_IMAGES).map((image, index) => (
        <div key={image} className="offer__image-wrapper">
          <img className="offer__image" src={image} alt={`Photo ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}
