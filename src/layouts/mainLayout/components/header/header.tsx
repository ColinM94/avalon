import { useNavigate } from "react-router-dom";

import { classes } from "utils";
import { useAppStore } from "stores";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Header = (props: Props) => {
  const { heading, showBackButton, className } = props;

  const { session } = useAppStore();

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {showBackButton && (
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
