import { useNavigate } from "react-router-dom";

import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Header = ({ heading, hideBackButton, className }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {!hideBackButton && (
        <div
          onClick={() => navigate(-1)}
          className={classes(styles.backButton, className)}
        >
          &#x2190;
        </div>
      )}

      <div className={styles.heading}>{heading}</div>
    </div>
  );
};
