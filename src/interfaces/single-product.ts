import { IProduct } from "./product-list";

export interface IProductProps {
  index: number;
  product: IProduct;
  onFav: (id: number) => void;
}
