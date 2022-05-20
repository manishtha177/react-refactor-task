import React, { useState, useEffect } from "react";
import AddProductModal from "../../components/AddProductModal";
import useFetch from "../../hooks/useFetch";
import { IShopProps, IShopState } from "../../interfaces/shop";
import Header from "../../components/Header";
import Banner from "./banner";
import ProductContainer from "../../components/ProductContainer";

const ShopApp: React.FC<IShopProps> = (): JSX.Element => {
  const [shopData, setShopData] = useState<IShopState>({
    products: [],
    isOpen: false,
    isShowingMessage: false,
    message: "",
  });
  const [data] = useFetch("products");
  const setData = (data: IShopProps) => {
    setShopData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const onFavClick = (id: number): void => {
    const prods = shopData?.products;
    const idx = prods?.findIndex((val) => val?.id === id);
    prods[idx].isFavorite = !prods?.[idx]?.isFavorite;
    setData({ products: prods });
  };

  const toggleAddProductModal = (): void => {
    setData({ isOpen: !shopData?.isOpen });
  };

  useEffect(() => {
    setData({ products: data?.reverse() });
  }, [data]);

  return (
    <>
      <Header />
      <Banner />
      <ProductContainer
        shopData={shopData}
        toggleAddProductModal={toggleAddProductModal}
        onFavClick={onFavClick}
      />
      {shopData?.isOpen && (
        <AddProductModal
          isOpen={shopData?.isOpen}
          toggleAddProductModal={toggleAddProductModal}
          setData={setData}
          shopData={shopData}
        />
      )}
    </>
  );
};

export default ShopApp;
