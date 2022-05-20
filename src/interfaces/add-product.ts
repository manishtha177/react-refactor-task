import { IShopProps, IShopState } from "./shop";

export interface IFormData {
  title: string;
  description: string;
  price: number;
}

export interface IAddProductProps {
  isOpen: boolean;
  toggleAddProductModal: () => void;
  setData: (payload: IShopProps) => void;
  shopData: IShopState;
}
