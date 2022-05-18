import * as React from "react";
import { IButtonProps } from "../interfaces/button";
import styles from "./button.module.css";

export const Button: React.FC<IButtonProps> = ({ children, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);
