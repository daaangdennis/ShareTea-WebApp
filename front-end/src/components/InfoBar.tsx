import React from "react";
import {
  InfoBarProps,
} from "../types/types";
import "../styles/LandingPage.css";

function InfoBar({ header, information, imageUrl } :InfoBarProps) {
  const noPaddingStyles = {
    padding: 0,
    margin: 0,
  };

  return (
    <div className="container">
      <div className="row my-5 mx-2 mx-lg-0 flex-column-reverse flex-lg-row">
        <div className="col-lg-8" style={noPaddingStyles}>
          <div className="infobar-text-container p-4 h-100">
            <h2 className="mb-4">{header}</h2>
            <p>{information}</p>
          </div>
        </div>
        <div className="col-lg-4" style={noPaddingStyles}>
          {/* Image and InfoBar with the same height */}
          <div className="d-flex flex-column h-100 align-items-end">
            <div className="info-bar-image">
              <img
                src= {imageUrl}
                alt="Info Bar Image"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// https://shareteahouston.com/wp-content/uploads/2022/03/Menu-No-Prices-scaled.jpg
export default InfoBar;
