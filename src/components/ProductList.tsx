import * as React from "react";
import lodash from 'lodash'
import SingleProduct from "./SingleProduct";
import { IPostsProps, IProduct } from "../interfaces/product-list";

const ProductList: React.FC<IPostsProps> = (props) => {
  return <div>{props.products.map((product: IProduct) =>
    <SingleProduct key={product.id} index={product.id} product={product} onFav={props.onFav} />)}</div>
}

export default ProductList;
