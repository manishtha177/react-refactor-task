import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/droppe-logo.png";

const Header = () => {
  return (
    <div data-testid={"header"} className={styles.header}>
      <div className={`container ${styles.headerImageWrapper}`}>
        <img alt="logo" src={logo} className={styles.headerImage} />
      </div>
    </div>
  );
};

export default Header;
