export interface IFormData {
    title: string; description: string; price: number
}

export interface IFormProps {
    onSubmit: (payload: IFormData) => void;
}