import React from "react";
import { ProductCardProps, ProductGridProps, product } from "../types/types";
import { Products, filteredProducts } from "../atoms/product";
import { useRecoilValue } from "recoil";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="col">
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
          <div className="d-flex justify-content-between align-items-center">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Add
            </button>
            <small className="text-dark">{product.price}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductGrid: React.FC<ProductGridProps> = () => {
  const products = useRecoilValue<product[]>(filteredProducts);
  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {products.map((product: product, i: number) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
