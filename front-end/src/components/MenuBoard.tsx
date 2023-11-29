import React, { useEffect } from "react";
import "../styles/menuBoard.css";
import ReactDOM from "react-dom";

const MenuBoard = () => {
  useEffect(() => {
    const words = document.querySelectorAll(".item, .price");

    words.forEach((word) => {
      const letters = Array.from((word.textContent || "").trim());
      const letterElements = letters.map((letter) =>
        letter !== " " ? (
          <span className="itembox">{letter}</span>
        ) : (
          <span className="itembox space"></span>
        )
      );
      ReactDOM.render(<>{letterElements}</>, word);
    });
  }, []);

  return (
    <div className="container board">
      <div className="row col-12 shelf"></div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">White</div>
        <div className="price">4.5</div>
      </div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Granola</div>
        <div className="price">12.0</div>
      </div>
      <div className="row col-12 shelf"></div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Black / Filter / Tea</div>
        <div className="price">4.0</div>
      </div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Egg in a scone</div>
        <div className="price">10.0</div>
      </div>
      <div className="row col-12 shelf"></div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Large</div>
        <div className="price">1.0</div>
      </div>
      <div className="row col-12 shelf"></div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Soy / almond / X shot</div>
        <div className="price">0.5</div>
      </div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Toasted:</div>
      </div>
      <div className="row col-12 shelf"></div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Ice</div>
        <div className="price">1.0</div>
      </div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Kimchi cheese</div>
        <div className="price">14.0</div>
      </div>
      <div className="row col-12 shelf"></div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Cold drinks</div>
        <div className="price">5.0</div>
      </div>
      <div className="col-md-6 col-sm-12 menu-item">
        <div className="item">Reuben</div>
        <div className="price">14.0</div>
      </div>

      <div className="row col-12 shelf"></div>
    </div>
  );
};

export default MenuBoard;
