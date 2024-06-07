import { useNavigate } from "react-router-dom";

import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const BackButton = ({ className }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)}
      className={classes(styles.container, className)}
    >
      &#x2190;
    </div>
  );
};
