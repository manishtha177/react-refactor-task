import { IProduct } from "./product-list";

export interface IShopProps { }

export interface IShopState {
  products: IProduct[];
  isOpen: boolean;
  isShowingMessage: boolean;
  message: string;
}