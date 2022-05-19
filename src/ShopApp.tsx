import React, { useState, useEffect } from "react";
import lodash from "lodash";
import AddProductModal from "./components/AddProductModal";
import useFetch from "./hooks/useFetch";
import { IShopProps, IShopState } from "./interfaces/shop";
import Header from "./components/common/Header";
import Banner from "./components/Banner";
import ProductContainer from "./components/ProductContainer";
import { constants } from "./utils/constants";

const ShopApp: React.FC<IShopProps> = () => {
  const [shopData, setShopData] = useState<IShopState>({
    products: [],
    isOpen: false,
    isShowingMessage: false,
    message: "",
  });

  const { fetchProducts, addProduct } = useFetch();

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

  const onSubmit = async (payload: {
    title: string;
    description: string;
    price: number;
  }) => {
    setData({
      isOpen: false,
      isShowingMessage: true,
      message: constants.PRODUCT_ADDING_MESSAGE,
    });

    try {
      const response = await addProduct(payload);
      if (response?.id) {
        const tempProducts = shopData?.products;
        tempProducts.unshift({
          id: response?.id,
          title: payload?.title,
          description: payload?.description,
          price: payload?.price,
          isFavorite: false,
          rating: { rate: 0, count: 0 },
        });
        setData({
          products: tempProducts,
          isShowingMessage: true,
          message: constants.PRODUCT_ADDDED_SUCCESSFULLY_MESSAGE,
        });
      } else {
        setData({
          isOpen: false,
          isShowingMessage: true,
          message: constants.FAILED_TO_ADD_PRODUCT_MESSAGE,
        });
      }
    } catch (error) {
      console.log("error : ", error);
      setData({
        isOpen: false,
        isShowingMessage: true,
        message: constants.SOMETHING_WENT_WRONT_MESSAGE,
      });
    } finally {
      setTimeout(() => {
        setData({ isShowingMessage: false, message: "" });
      }, 2000);
    }
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
          onSubmit={onSubmit}
        />
      )}
    </React.Fragment>
  );
};

export default ShopApp;
