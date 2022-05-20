import * as React from "react";
import { IButtonProps } from "../../interfaces/button";
import styles from "./index.module.css";

export const Button: React.FC<IButtonProps> = ({ children, onClick }: IButtonProps) => (
  <button className={styles.button} onClick={onClick} data-testid={"send-product-button"}>
    {children}
  </button>
);
