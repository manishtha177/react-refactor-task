export interface IFormData {
    title: string; description: string; price: string
}

export interface IFormProps {
    onSubmit: (payload: IFormData) => void;
}