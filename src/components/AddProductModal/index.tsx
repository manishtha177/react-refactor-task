import React from "react";
import Modal from "react-modal";
import styles from "../../Pages/ShopApp/index.module.css";
import { FaTimes } from "react-icons/fa";
import { Form } from "../Form/index";
import { IAddProductProps } from "../../interfaces/add-product";
import { constants } from "../../utils/constants";
import { addProduct } from "../../services/addProduct";

const AddProductModal: React.FC<IAddProductProps> = ({
  isOpen,
  toggleAddProductModal,
  setData,
  shopData,
}: IAddProductProps) => {
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

  return (
    <Modal
      isOpen={isOpen}
      className={styles.reactModalContent}
      overlayClassName={styles.reactModalOverlay}
      onRequestClose={toggleAddProductModal}
    >
      <div className={styles.modalContentHelper}>
        <div className={styles.modalClose} onClick={toggleAddProductModal}>
          <FaTimes />
        </div>

        <Form onSubmit={onSubmit} />
      </div>
    </Modal>
  );
};

export default AddProductModal;
