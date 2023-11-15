import React, { useState } from "react";
import {
  ProductCardProps,
  ProductGridProps,
  customItem,
  product,
} from "../types/types";
import { Link } from "react-router-dom";
import "../styles/MenuPage.css";
var _ = require("lodash");

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [data, setdata] = useState<customItem>({
    isEdit: false,

    isAdd: true,
    item: { product },
  });


  return (
    <div className="col mb-4">
      <Link
        to={`/custom`}
        state={{ data: data }}
        style={{ textDecoration: "none" }}
      >

        <div>

          <div
            className="card menupage-productcard p-4"
            style={{ backgroundColor: "#cf152d", borderRadius: "15px" }}
          >
            <img
              className="card-img-top"
              width="220"
              height="500"
              style={{
                objectFit: "cover",
                backgroundColor: "white",
                borderRadius: "15px",
              }}
              src={product.url}
              alt={product.name}
            />
            <div className="card-body py-3 px-0">
              <h2
                style={{
                  height: "68px",
                }}
              >
                {product.name}
              </h2>
              <h3 className="card-text pt-3">${product.price.toFixed(2)}</h3>
              {/* <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={addProductToCart}
            >
              Add
            </button>
            <small className="text-dark fs-5">{product.price} $</small>
          </div> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProductGrid: React.FC<ProductGridProps> = ({ products = [] }) => {
  return (
    <div className="album py-md-5 menupage-productgrid-container">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {products.map((product: product, i: number) => (
            <ProductCard key={product.name + i} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
