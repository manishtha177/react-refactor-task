import { IShopState } from "./shop";

export interface IProductProps {
  products: IProduct[];
  onFav: (id: number) => void;
}

export interface IProductContainerProps {
  shopData: IShopState;
  toggleAddProductModal: () => void;
  onFavClick: (id: number) => void;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  isFavorite: boolean;
  rating: { rate: number; count: number };
}
