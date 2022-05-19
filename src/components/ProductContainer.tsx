import * as React from "react";
import { IProductContainerProps, IProduct } from "../interfaces/product-list";
import styles from "../shopApp.module.css";
import { Button } from "./Button";
import ProductList from "./ProductList";

const ProductContainer: React.FC<IProductContainerProps> = ({
  shopData,
  toggleAddProductModal,
  onFavClick,
}) => {
  return (
    <div className={`container ${styles.main}`} style={{ paddingTop: 0 }}>
      <div className={styles.buttonWrapper}>
        <span role="button">
          <Button onClick={toggleAddProductModal}>Send product proposal</Button>
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
          {
            shopData.products.filter((product: IProduct) => product.isFavorite)
              .length
          }
        </span>
      </div>

      {shopData.products && shopData.products.length ? (
        <ProductList products={shopData.products} onFav={onFavClick} />
      ) : (
        <div className={styles.notFound}>No Data Found</div>
      )}
    </div>
  );
};

export default ProductContainer;
