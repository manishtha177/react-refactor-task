import React from "react";
import { IInputProps } from "../interfaces/form";
import styles from "./Form.module.css";

const Input: React.FC<IInputProps> = ({ field, error }: IInputProps) => {
  return (
    <div>
      <span className={styles.label}>{field?.label} *</span>
      <input
        placeholder={field?.placeHolder}
        type={field?.type}
        name={field?.name}
        value={field?.value}
        className={styles.input}
        onChange={field?.onChange}
      />
      <p className={styles.error}>{error[field?.name] && `${field?.label} is required`}</p>
    </div>
  );
};

export default Input;
