import React from 'react';
import Modal from "react-modal";
import styles from "../shopApp.module.css";
import { FaTimes } from "react-icons/fa";
import { Form } from "./Form";

interface IFormData {
  title: string; description: string; price: string
}

interface IAddProductProps {
	isOpen: boolean;
	toggleAddProductModal: () => void;
	onSubmit: (payload: IFormData) => void;
}

const AddProduct: React.FC<IAddProductProps> = ({ isOpen, toggleAddProductModal, onSubmit }) => {
	return (
		<Modal
			isOpen={isOpen}
			className={styles.reactModalContent}
			overlayClassName={styles.reactModalOverlay}
			onRequestClose={toggleAddProductModal}
		>
			<div className={styles.modalContentHelper}>
				<div
					className={styles.modalClose}
					onClick={toggleAddProductModal}>
					<FaTimes />
				</div>

				<Form onSubmit={onSubmit} />
			</div>
		</Modal>
	)
}

export default AddProduct