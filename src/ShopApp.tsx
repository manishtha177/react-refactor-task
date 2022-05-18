import React, { useState, useEffect } from "react";
import lodash from 'lodash';
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import ProductList from "./components/ProductList";
import { Form } from "./components/form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";

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
          products: data
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
    const updated = lodash.clone(shopData.products);
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price
    });

    setShopData((prevData) => ({
      ...prevData,
      products: updated,
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
    })
      .then(res => res.json())
      .then(json => {
        setTimeout(() => {
          setShopData((prevData) => ({
            ...prevData,
            isShowingMessage: false,
            message: ''
          }))
        }, 2000)
      })
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
            <Button
              onClick={() => {
                setShopData((prevData) => ({
                  ...prevData,
                  isOpen: true,
                }));
              }}
            >Send product proposal</Button>
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

      <>
        <Modal
          isOpen={isOpen}
          className={styles.reactModalContent}
          overlayClassName={styles.reactModalOverlay}
        >
          <div className={styles.modalContentHelper}>
            <div
              className={styles.modalClose}
              onClick={() => {
                setShopData((prevData) => ({
                  ...prevData,
                  isOpen: false,
                }));
              }}
            ><FaTimes /></div>

            <Form
              on-submit={onSubmit}
            />
          </div>
        </Modal>
      </>
    </React.Fragment>
  );
}

export default ShopApp;