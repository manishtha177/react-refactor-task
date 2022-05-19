import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { IFormData, IFormError, IFormProps } from "../interfaces/form";
import { validateForm } from "../utils/validate";
import { Button } from "./Button";
import styles from "./Form.module.css";
import Input from "./Input";

export const Form: React.FC<IFormProps> = (props) => {
  const formDummyData = { title: "", price: 0, description: "" };
  const [formData, setFormData] = useState<IFormData>(formDummyData);
  
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
      [e?.target?.name]: false,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { formIsValid, errors } = validateForm(formData, error);
    if (formIsValid) {
      props.onSubmit({
        title: formData?.title,
        description: formData?.description,
        price: formData?.price,
      });

      setFormData(formDummyData);
    } else {
      console.log("errors : ", errors);
      setError(errors);
    }
  };

  const fields = [
    { name: "title", label: "Product Title", type: "text", placeHolder: "Title...", value: formData?.title, onChange: handleChange },
    { name: "price", label: "Product Price", type: "number", placeHolder: "Price...", value: formData?.price, onChange: handleChange },
  ];

  return (
    <form
      className={styles.form}
      onSubmit={(event) => handleSubmit(event)}
      data-testid={"form"}
    >
      {fields.map((field) => (<Input field={field} error={error} />))}

      <span className={styles.label}>Product Description: *</span>

      <textarea
        placeholder="Start typing product description here..."
        name="description"
        value={formData?.description}
        className={styles?.textarea}
        onChange={handleChange}
      />
      <p className={styles.error}>{error?.description && "Product Description is required"}</p>

      <div className={styles.buttonWrapper}>
        <Button>Add a product</Button>
      </div>
    </form>
  );
};
