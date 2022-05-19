import React from "react";
import { FaStar } from "react-icons/fa";
import { IProductProps } from "../interfaces/single-product";
import { constants } from "../utils/constants";
import styles from "./SingleProduct.module.css";

const SingleProduct: React.FC<IProductProps> = ({ product, onFav }: IProductProps) => {
  const {
    product: productClass,
    productBody,
    actionBarItem,
    actionBarItemLabel,
    productTitle,
    actionBar,
  } = styles;
  // Problem: Now product title can be too long, I just put overflowX as fix now
  return (
    <div className={productClass} data-testid={"single-product"}>
      <div title={product?.title} className={productTitle}>
        {product?.title}
      </div>

      <p>
        <strong>
          Rating: {product?.rating ? `${product?.rating?.rate}/5` : ""}
        </strong>
      </p>

      <p>
        <b>Price: ${+product?.price}</b>
      </p>

      <p className={productBody}>
        <span>
          <b>Description:</b>
        </span>
        <br />
        {product?.description}
      </p>

      <span className={actionBar}>
        <span
          className={`${actionBarItem} ${product?.isFavorite ? "active" : ""}`}
          role="button"
          onClick={() => onFav(product?.id)}
        >
          <FaStar />{" "}
          <span className={actionBarItemLabel} data-testid={"is-favorite"}>
            {product?.isFavorite
              ? constants.REMOVE_FROM_FAVOURITE
              : constants.ADD_TO_FAVOURITE}
          </span>
        </span>
      </span>
    </div>
  );
};

export default SingleProduct;
