import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { IFormData, IFormError, IFormProps } from "../interfaces/form";
import { validateForm } from "../utils/validate";
import { Button } from "./Button";
import styles from "./Form.module.css";

export const Form: React.FC<IFormProps> = (props) => {
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    price: 0,
    description: "",
  });
  const [error, setError] = useState<IFormError>({
    title: false,
    price: false,
    description: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    setError((prevError) => ({
      ...prevError,
      [e.target.name]: false,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { formIsValid, errors } = validateForm(formData, error);
    if (formIsValid) {
      props.onSubmit({
        title: formData.title,
        description: formData.description,
        price: formData.price,
      });

      setFormData({ title: "", price: 0, description: "" });
    } else {
      console.log("errors : ", errors);
      setError(errors);
    }
  };

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
      <span className={styles.label}>Product title: *</span>

      <input
        placeholder="Title..."
        name="title"
        value={formData.title}
        className={styles.input}
        onChange={handleChange}
      />
      {error.title && (
        <span className={styles.error}>Product Title is required</span>
      )}

      <span className={styles.label}>Product Price: *</span>

      <input
        placeholder="Price..."
        type="number"
        name="price"
        value={formData.price}
        className={styles.input}
        onChange={handleChange}
      />
      {error.price && (
        <span className={styles.error}>Product Price is required</span>
      )}

      <span className={styles.label}>Product Description: *</span>

      <textarea
        placeholder="Start typing product description here..."
        name="description"
        value={formData.description}
        className={styles.textarea}
        onChange={handleChange}
      />
      {error.description && (
        <span className={styles.error}>Product Description is required</span>
      )}

      <div className={styles.buttonWrapper}>
        <Button>Add a product</Button>
      </div>
    </form>
  );
};
