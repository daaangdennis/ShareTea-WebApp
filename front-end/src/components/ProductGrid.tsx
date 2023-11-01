import React, { useState } from "react";
import { ProductCardProps, ProductGridProps, product } from "../types/types";
import { Link } from "react-router-dom";
var _ = require("lodash");

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [data, setdata] = useState<product>(product);

  const handleCustom = () => {};

  return (
    <div className="col">
      <Link to={`/custom`} state={{ data: data }}>
        <div onClick={handleCustom}>
          <div className="card shadow-sm">
            <img
              className="bd-placeholder-img card-img-top"
              width="220"
              height="500"
              style={{
                objectFit: "cover",
              }}
              src={product.url}
              alt={product.name}
            />
            <div className="card-body">
              <h3
                style={{
                  width: "300px",
                  height: "34px",
                  overflow: "auto",
                }}
              >
                {product.name}
              </h3>
              <p className="card-text">{product.description}</p>
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
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {products.map((product: product, i: number) => (
            <ProductCard key={product.name + i} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
