import React, { useState, useEffect } from "react";
import lodash from "lodash";
import AddProductModal from "./components/AddProductModal";
import useFetch from "./hooks/useFetch";
import { IShopProps, IShopState } from "./interfaces/shop";
import Header from "./components/common/Header";
import Banner from "./components/Banner";
import ProductContainer from "./components/ProductContainer";

const ShopApp: React.FC<IShopProps> = () => {
  const [shopData, setShopData] = useState<IShopState>({
    products: [],
    isOpen: false,
    isShowingMessage: false,
    message: "",
  });

  const { fetchProducts } = useFetch();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  const setData = (data: IShopProps) => {
    setShopData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const getProducts = async () => {
    const response = await fetchProducts();
    setData({ products: response?.reverse() });
  };

  const onFavClick = (id: number) => {
    const prods = shopData?.products;
    const idx = lodash?.findIndex(prods, { id: id });
    prods[idx].isFavorite = !prods?.[idx]?.isFavorite;
    setData({ products: prods });
  };

  const toggleAddProductModal = () => {
    setData({ isOpen: !shopData?.isOpen });
  };

  return (
    <React.Fragment>
      <Header />

      <Banner />

      <ProductContainer shopData={shopData} toggleAddProductModal={toggleAddProductModal} onFavClick={onFavClick} />

      {shopData?.isOpen && (
        <AddProductModal
          isOpen={shopData?.isOpen}
          toggleAddProductModal={toggleAddProductModal}
          setData={setData}
          shopData={shopData}
        />
      )}
    </React.Fragment>
  );
};

export default ShopApp;
