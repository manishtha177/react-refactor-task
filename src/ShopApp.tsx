import React, { useState, useEffect } from "react";
import lodash from 'lodash';
import { Button } from "./components/button";
import ProductList from "./components/ProductList";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";
import AddProduct from "./components/AddProduct";

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

  useEffect(() => {
    fetch('https://fakestoreapi.com/products').then((response) => {
      let jsonResponse = response.json();

      jsonResponse.then((rawData) => {
        let data: any[] = [];

        for (let i = 0; i < rawData.length; i++) {
          let updatedProd = rawData[i];
          data.push(updatedProd);
        }
        setShopData((prevData) => ({
          ...prevData,
          products: data.reverse()
        }));
      });
    });
  }, [])


  const onFavClick = (id: number) => {
    const prods = shopData.products;
    const idx = lodash.findIndex(prods, { id: id })
    prods[idx].isFavorite = !prods[idx].isFavorite;

    setShopData((prevData) => ({ ...prevData, products: prods }));
  }

  const onSubmit = (payload: { title: string; description: string, price: string }) => {
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
      products: tempProducts,
      isOpen: false,
      isShowingMessage: true,
      message: 'Adding product...'
    }));

    // **this POST request doesn't actually post anything to any database**
    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify(
        {
          title: payload.title,
          price: payload.price,
          description: payload.description,
        }
      )
    }).then(res => res.json())
      .then((data) => {
        console.log('resp data : ', data)
        setTimeout(() => {
          setShopData((prevData) => ({
            ...prevData,
            isShowingMessage: false,
            message: ''
          }))
        }, 2000)
      })
  }

  const toggleAddProductModal = () => {
    setShopData((prevData: any) => ({
      ...prevData,
      isOpen: !prevData.isOpen,
    }));
  }

  const { products, isOpen } = shopData;
  const favCount = shopData.products.filter(product => product.isFavorite).length;

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={['container', styles.headerImageWrapper].join(' ')}>
          <img src={logo} className={styles.headerImage} />
        </div>
      </div>

      <>
        <span
          className={['container', styles.main].join(' ')}
          style={{ margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly' }}
        >
          <img src={img1} style={{ maxHeight: "15em", display: 'block' }} />
          <img src={img2} style={{ maxHeight: "15rem", display: 'block' }} />
        </span>
      </>

      <div className={['container', styles.main].join(' ')} style={{ paddingTop: 0 }}>
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
          <span>Number of favorites: {favCount}</span>
        </div>

        {products && !!products.length ? <ProductList products={products} onFav={onFavClick} /> : <div></div>}
      </div>

      {isOpen && <AddProduct isOpen={isOpen} toggleAddProductModal={toggleAddProductModal} onSubmit={onSubmit} />}
    </React.Fragment>
  );
}

export default ShopApp;