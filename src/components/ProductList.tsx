import * as React from "react";
import lodash from 'lodash'
import SingleProduct from "./SingleProduct";

interface IPostsProps {
  products: any;
  onFav: (id: number) => void;
}

const ProductList: React.FC<IPostsProps> = (props) => {
  let productsarr = []
  for (const [i, p] of props.products.entries()) {
    productsarr.push(
      <SingleProduct key={i} index={i} product={p} onFav={props.onFav} />
    );
  }
  return <div>{lodash.reverse(productsarr)}</div>
}

export default ProductList;
