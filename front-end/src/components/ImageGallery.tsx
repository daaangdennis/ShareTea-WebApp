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
      <div className="container col-md-12 d-flex">
        {/* <div className="row"> */}
        <div className="image-gallery-container d-flex" style={{ ...style }}>
          <img
            src={images[index]}
            className="ImageGallery, img-fluid"
            alt={`Image ${index + 1}`}
          />
          <div className="button-container col-md-12 col-md-6 d-flex">
            <button
              onClick={prevImage}
              className="btn btn-dark btn-sm"
              data-slide="prev"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-left-fill"
                viewBox="0 0 16 16"
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="btn btn-dark btn-sm"
              data-slide="next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-caret-right-fill"
                viewBox="0 0 16 16"
              >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
export default ImageGallery;
