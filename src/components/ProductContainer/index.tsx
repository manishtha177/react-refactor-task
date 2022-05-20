import * as React from "react";
import {
  IProductContainerProps,
  IProduct,
} from "../../interfaces/product-list";
import styles from "../../Pages/ShopApp/index.module.css";
import { constants } from "../../utils/constants";
import { Button } from "../Button";
import ProductList from "../ProductList";

const ProductContainer: React.FC<IProductContainerProps> = ({
  shopData,
  toggleAddProductModal,
  onFavClick,
}: IProductContainerProps) => {
  return (
    <div className={`container ${styles.main}`} style={{ paddingTop: 0 }}>
      <div className={styles.buttonWrapper}>
        <span role="button">
          <Button onClick={toggleAddProductModal}>
            {constants.SEND_PRODUCT_PROPOSAL}
          </Button>
        </span>
        {shopData?.isShowingMessage && (
          <div className={styles.messageContainer}>
            <i>{shopData?.message}</i>
          </div>
        )}
      </div>

      <div className={styles.statsContainer}>
        <span>
          {constants.TOTAL_PRODUCTS}: {shopData?.products?.length}
        </span>
        {" - "}
        <span>
          {constants.NUMBER_OF_FAVOURITES}:{" "}
          {
            shopData?.products?.filter(
              (product: IProduct) => product?.isFavorite
            )?.length
          }
        </span>
      </div>

      {shopData?.products && shopData?.products.length ? (
        <ProductList products={shopData?.products} onFav={onFavClick} />
      ) : (
        <div className={styles.notFound}>{constants.NO_DATA_FOUND}</div>
      )}
    </div>
  );
};

export default ProductContainer;
