import * as React from "react";
import SingleProduct from "../SingleProduct";
import { IProductProps, IProduct } from "../../interfaces/product-list";

const ProductList: React.FC<IProductProps> = (props: IProductProps) => {
  return (
    <div>
      {props?.products?.map((product: IProduct) => (
        <SingleProduct
          key={product?.id}
          index={product?.id}
          product={product}
          onFav={props?.onFav}
        />
      ))}
    </div>
  );
};

export default ProductList;
