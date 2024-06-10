import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Heading = ({ heading, className }: Props) => {
  return <div className={classes(styles.container, className)}>{heading}</div>;
};
