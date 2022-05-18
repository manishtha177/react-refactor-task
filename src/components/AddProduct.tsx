import React from 'react';
import Modal from "react-modal";
import styles from "../shopApp.module.css";
import { FaTimes } from "react-icons/fa";
import { Form } from "../components/form";

interface IAddProductProps {
	isOpen: boolean;
	toggleAddProductModal: () => void;
	onSubmit: (payload: { title: string; description: string; price: string }) => void;
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

				<Form on-submit={onSubmit} />
			</div>
		</Modal>
	)
}

export default AddProduct