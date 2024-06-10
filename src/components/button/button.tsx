import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Button = (props: Props) => {
  const { label, onClick, disabled, className } = props;

  const handleClick = () => {
    if (disabled) return;

    onClick();
  };

  return (
    <div
      onClick={onClick}
      className={classes(
        className,
        styles.container,
        disabled && styles.disabled
      )}
    >
      {label}
    </div>
  );
};
