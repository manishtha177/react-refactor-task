import * as React from "react";
import lodash from 'lodash'
import SingleProduct from "./SingleProduct";

interface IPostsProps {
  products: any;
  onFav: (id: number) => void;
}

interface IProduct {
  id: number,
  title: string;
  description: string;
  price: number;
  isFavorite: boolean;
  rating: { rate: number; count: number }
}

const ProductList: React.FC<IPostsProps> = (props) => {
  return <div>{props.products.map((product: IProduct) =>
    <SingleProduct key={product.id} index={product.id} product={product} onFav={props.onFav} />)}</div>
}

export default ProductList;
