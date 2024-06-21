import { Button } from "components";
import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const ReadyButton = ({ isReady, onClick }: Props) => {
  return (
    <Button
      label="Ready"
      onClick={onClick}
      className={classes(styles.container, isReady && styles.hidden)}
    />
  );
};
