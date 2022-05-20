import React from "react";
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";
import styles from "./index.module.css";

const Banner: React.FC = (): JSX.Element => {
  return (
    <>
      <span className={`container ${styles.main} ${styles.images}`}>
        <img data-testid={"img-1"} src={img1} alt="doctor" />
        <img data-testid={"img-2"} src={img2} alt="engineer" />
      </span>
    </>
  );
};

export default Banner;
