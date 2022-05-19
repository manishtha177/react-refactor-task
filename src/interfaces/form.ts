export interface IFormData {
  title: string;
  description: string;
  price: number;
}

export interface IFormError {
  title: boolean;
  description: boolean;
  price: boolean;
}

export interface IFormProps {
  onSubmit: (payload: IFormData) => void;
}
