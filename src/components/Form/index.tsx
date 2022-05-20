import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import {
  IFormData,
  IFormError,
  IFormProps,
  IField,
} from "../../interfaces/form";
import { constants } from "../../utils/constants";
import { validateForm } from "../../utils/validate";
import { Button } from "../Button";
import styles from "./index.module.css";
import Input from "../Input";

export const Form: React.FC<IFormProps> = (props: IFormProps) => {
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
    let name = e?.target?.name;
    let value = e?.target?.value;
    e.persist();
    setError((prevError) => ({
      ...prevError,
      [name]: false,
    }));
    if ("price" === name) {
      value = value[0] === "0" ? value[1] : value;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

  const fields: IField[] = [
    {
      name: "title",
      label: constants.PRODUCT_TITLE,
      type: "text",
      placeHolder: "Title...",
      value: formData?.title,
      onChange: handleChange,
    },
    {
      name: "price",
      label: constants.PRODUCT_PRICE,
      type: "number",
      placeHolder: "Price...",
      value: formData?.price,
      onChange: handleChange,
    },
  ];

  return (
    <form
      className={styles.form}
      onSubmit={(event) => handleSubmit(event)}
      data-testid={"form"}
    >
      {fields.map((field) => (
        <Input key={field.name} field={field} error={error} />
      ))}

      <span className={styles.label}>{constants.PRODUCT_DESCRIPTION}: *</span>

      <textarea
        placeholder="Start typing product description here..."
        name="description"
        value={formData?.description}
        className={styles?.textarea}
        onChange={handleChange}
      />
      <p className={styles.error}>
        {error?.description && `${constants.PRODUCT_DESCRIPTION} is required`}
      </p>

      <div className={styles.buttonWrapper}>
        <Button>Add a product</Button>
      </div>
    </form>
  );
};
