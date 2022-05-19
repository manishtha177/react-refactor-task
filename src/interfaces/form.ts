import { ChangeEvent } from "react";

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

export interface IField {
  name: string;
  label: string;
  type: string;
  placeHolder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface IInputProps {
  field: IField;
  error: any
}
