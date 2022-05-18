import React, { useState, useEffect } from "react";
import lodash from 'lodash';
import { Button } from "./components/button";
import ProductList from "./components/ProductList";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";
import AddProduct from "./components/AddProduct";
import useFetch from "./hooks/useFetch";

interface IShopProps { }

interface IShopState {
  products: any[];
  isOpen: boolean;
  isShowingMessage: boolean;
  message: string;
}

const ShopApp: React.FC<IShopProps> = () => {
  const [shopData, setShopData] = useState<IShopState>({
    products: [], isOpen: false, isShowingMessage: false, message: ''
  })

  const { fetchProducts, addProduct } = useFetch();

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await fetchProducts()
    setShopData((prevData) => ({
      ...prevData,
      products: response.reverse()
    }));
  }

  const onFavClick = (id: number) => {
    const prods = shopData.products;
    const idx = lodash.findIndex(prods, { id: id })
    prods[idx].isFavorite = !prods[idx].isFavorite;

    setShopData((prevData) => ({ ...prevData, products: prods }));
  }

  const onSubmit = async (payload: { title: string; description: string, price: string }) => {
    const tempProducts = shopData.products;
    tempProducts.unshift({
      id: shopData.products.length + 1,
      title: payload.title,
      description: payload.description,
      price: payload.price,
      isFavorite: false,
      rating: { rate: 0, count: 0 }
    })

    setShopData((prevData) => ({
      ...prevData,
      isOpen: false,
      isShowingMessage: true,
      message: 'Adding Product...'
    }))

    try {
      const response = await addProduct(payload)
      if (response?.id) {
        setShopData((prevData) => ({
          ...prevData,
          products: tempProducts,
          isShowingMessage: true,
          message: 'Product added successfully...'
        }));
      } else {
        setShopData((prevData) => ({
          ...prevData,
          isOpen: false,
          isShowingMessage: true,
          message: 'Failed to add product...'
        }))
      }
    } catch (error) {
      console.log('error : ', error)
      setShopData((prevData) => ({
        ...prevData,
        isOpen: false,
        isShowingMessage: true,
        message: 'Something went wrong'
      }))
    } finally {
      setTimeout(() => {
        setShopData((prevData) => ({
          ...prevData,
          isShowingMessage: false,
          message: ''
        }))
      }, 2000)
    }
  }

  const toggleAddProductModal = () => {
    setShopData((prevData: any) => ({
      ...prevData,
      isOpen: !prevData.isOpen,
    }));
  }

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={`container ${styles.headerImageWrapper}`}>
          <img src={logo} className={styles.headerImage} />
        </div>
      </div>

      <>
        <span className={`container ${styles.main} ${styles.images}`}>
          <img src={img1} alt="docter" />
          <img src={img2} alt="engineer" />
        </span>
      </>

      <div className={`container ${styles.main}`} style={{ paddingTop: 0 }}>
        <div className={styles.buttonWrapper}>
          <span role="button">
            <Button onClick={toggleAddProductModal}>Send product proposal</Button>
          </span>
          {shopData.isShowingMessage && <div className={styles.messageContainer}>
            <i>{shopData.message}</i>
          </div>}
        </div>

        <div className={styles.statsContainer}>
          <span>Total products: {shopData.products.length}</span>
          {' - '}
          <span>Number of favorites: {shopData.products.filter(product => product.isFavorite).length}</span>
        </div>

        {shopData.products && !!shopData.products.length ? <ProductList products={shopData.products} onFav={onFavClick} /> : <div></div>}
      </div>

      {shopData.isOpen && <AddProduct isOpen={shopData.isOpen} toggleAddProductModal={toggleAddProductModal} onSubmit={onSubmit} />}
    </React.Fragment>
  );
}

export default ShopApp;