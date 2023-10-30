import React from "react";
import { useRecoilState } from "recoil";
import { activeImageState } from "../atoms/activeImageState";
import { ImageGalleryProps } from "../types/types";
import "../styles/ImageGallery.css";
const ImageGallery: React.FC<ImageGalleryProps> = ({ images, style }) => {
  const [index, setIndex] = useRecoilState(activeImageState);

  const prevImage = () => {
    setIndex((currIndex) =>
      currIndex === 0 ? images.length - 1 : currIndex - 1
    );
  };

  const nextImage = () => {
    setIndex((currIndex) => (currIndex + 1) % images.length);
  };

  // const containerStyle : React.CSSProperties = {
  //     ...style,
  //     backgroundImage: `url("${images[index]}")`,
  //     position: "relative",
  // };

  return (
    <>
      <div className="image-gallery-container" style={{ ...style }}>
        <img
          src={images[index]}
          className="ImageGallery"
          alt={`Image ${index + 1}`}
        />
        <div className="button-container">
          <button onClick={prevImage} className="btn btn-primary btn-custom">
            &larr; Previous
          </button>
          <button onClick={nextImage} className="btn btn-primary btn-custom">
            Next &rarr;
          </button>
        </div>
      </div>
    </>
  );
};
export default ImageGallery;
