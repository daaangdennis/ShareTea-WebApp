import React from "react";

function InfoBar() {
  const noPaddingStyles = {
    padding: 0,
    margin: 0,
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8" style={noPaddingStyles}>
          <div className="info-bar bg-danger text-white p-3 h-100">
            <h2>Info Header</h2>
            <p>
              This is some information in the info bar. You can add your text
              here.
            </p>
          </div>
        </div>
        <div className="col-4" style={noPaddingStyles}>
          {/* Image and InfoBar with the same height */}
          <div className="d-flex flex-column h-100 align-items-end">
            <div className="info-bar-image">
              <img
                src="https://shareteahouston.com/wp-content/uploads/2022/03/Menu-No-Prices-scaled.jpg"
                alt="Info Bar Image"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-4"></div>
    </div>
  );
}
// https://shareteahouston.com/wp-content/uploads/2022/03/Menu-No-Prices-scaled.jpg
export default InfoBar;
