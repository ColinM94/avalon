import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Button = (props: Props) => {
  const { label, onClick, className } = props;

  return (
    <div onClick={onClick} className={classes(className, styles.container)}>
      {label}
    </div>
  );
};
