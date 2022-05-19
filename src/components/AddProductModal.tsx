import React from "react";
import Modal from "react-modal";
import styles from "../shopApp.module.css";
import { FaTimes } from "react-icons/fa";
import { Form } from "./Form";
import { IAddProductProps } from "../interfaces/add-product";

const AddProductModal: React.FC<IAddProductProps> = ({
  isOpen,
  toggleAddProductModal,
  onSubmit,
}: IAddProductProps) => {
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
