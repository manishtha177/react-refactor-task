import React from "react";
import styles from "./Form.module.css";

const Input = ({ field, error }: any) => {
  return (
    <div>
      <span className={styles.label}>{field.label} *</span>
      <input
        placeholder={field.placeHolder}
        type={field.type}
        name={field.name}
        value={field.value}
        className={styles.input}
        onChange={field.onChange}
      />
      <p className={styles.error}>{error[field.name] && `${field.label} is required`}</p>
    </div>
  );
};

export default Input;
