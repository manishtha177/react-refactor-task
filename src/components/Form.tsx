import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { IFormData, IFormProps } from "../interfaces/form";
import { Button } from "./Button";
import styles from "./Form.module.css";

export const Form: React.FC<IFormProps> = (props) => {
  const [formData, setFormData] = useState<IFormData>({ title: "", price: 0, description: "" })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.persist();
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!formData.title) {
      alert("Your product needs a title");

      return;
    }

    if (!formData.price || !formData.description) {
      alert("Your product needs some content");

      return;
    }

    props.onSubmit({
      title: formData.title,
      description: formData.description,
      price: formData.price,
    });
    
    setFormData({ title: "", price: 0, description: "" })
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

      <span className={styles.label}>Product Price: *</span>

      <input
        placeholder="Price..."
        type="number"
        name="price"
        value={formData.price}
        className={styles.input}
        onChange={handleChange}
      />

    <span className={styles.label}>Product Description: *</span>

      <textarea
        placeholder="Start typing product description here..."
        name="description"
        value={formData.description}
        className={styles.textarea}
        onChange={handleChange}
      />

      <Button>Add a product</Button>
    </form>
  );
};
