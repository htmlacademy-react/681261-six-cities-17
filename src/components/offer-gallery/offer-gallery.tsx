type OfferGalleryProps = {
  images: string[];
}

export default function OfferGallery({ images }: OfferGalleryProps) {
  return (
    <div className="offer__gallery">
      {images.slice(0, 6).map((image, index) => (
        <div key={image} className="offer__image-wrapper">
          <img className="offer__image" src={image} alt={`Photo ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}
