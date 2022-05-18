export interface IFormData {
    title: string; description: string; price: string
}

export interface IAddProductProps {
    isOpen: boolean;
    toggleAddProductModal: () => void;
    onSubmit: (payload: IFormData) => void;
}