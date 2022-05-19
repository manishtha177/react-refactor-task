import React, { useState, useEffect } from "react";
import lodash from "lodash";
import { Button } from "./components/Button";
import ProductList from "./components/ProductList";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";
import AddProduct from "./components/AddProduct";
import useFetch from "./hooks/useFetch";
import { IShopProps, IShopState } from "./interfaces/shop";

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
    setData({ products: response.reverse() });
  };

  const onFavClick = (id: number) => {
    const prods = shopData.products;
    const idx = lodash.findIndex(prods, { id: id });
    prods[idx].isFavorite = !prods[idx].isFavorite;
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
      message: "Adding Product...",
    });

    try {
      const response = await addProduct(payload);
      if (response?.id) {
        const tempProducts = shopData.products;
        tempProducts.unshift({
          id: response?.id,
          title: payload.title,
          description: payload.description,
          price: payload.price,
          isFavorite: false,
          rating: { rate: 0, count: 0 },
        });
        setData({
          products: tempProducts,
          isShowingMessage: true,
          message: "Product added successfully...",
        });
      } else {
        setData({
          isOpen: false,
          isShowingMessage: true,
          message: "Failed to add product...",
        });
      }
    } catch (error) {
      console.log("error : ", error);
      setData({
        isOpen: false,
        isShowingMessage: true,
        message: "Something went wrong",
      });
    } finally {
      setTimeout(() => {
        setData({ isShowingMessage: false, message: "" });
      }, 2000);
    }
  };

  const toggleAddProductModal = () => {
    setData({ isOpen: !shopData.isOpen });
  };

  return (
    <React.Fragment>
      <div data-testid={"header"} className={styles.header}>
        <div className={`container ${styles.headerImageWrapper}`}>
          <img alt="logo" src={logo} className={styles.headerImage} />
        </div>
      </div>

      <>
        <span className={`container ${styles.main} ${styles.images}`}>
          <img data-testid={"img-1"} src={img1} alt="docter" />
          <img data-testid={"img-2"} src={img2} alt="engineer" />
        </span>
      </>

      <div className={`container ${styles.main}`} style={{ paddingTop: 0 }}>
        <div className={styles.buttonWrapper}>
          <span role="button">
            <Button onClick={toggleAddProductModal}>
              Send product proposal
            </Button>
          </span>
          {shopData.isShowingMessage && (
            <div className={styles.messageContainer}>
              <i>{shopData.message}</i>
            </div>
          )}
        </div>

        <div className={styles.statsContainer}>
          <span>Total products: {shopData.products.length}</span>
          {" - "}
          <span>
            Number of favorites:{" "}
            {shopData.products.filter((product) => product.isFavorite).length}
          </span>
        </div>

        {shopData.products && shopData.products.length ? (
          <ProductList products={shopData.products} onFav={onFavClick} />
        ) : (
          <div className={styles.notFound}>No Data Found</div>
        )}
      </div>

      {shopData.isOpen && (
        <AddProduct
          isOpen={shopData.isOpen}
          toggleAddProductModal={toggleAddProductModal}
          onSubmit={onSubmit}
        />
      )}
    </React.Fragment>
  );
};

export default ShopApp;
