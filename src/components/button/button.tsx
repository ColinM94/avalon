import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Button = (props: Props) => {
  const { label, onClick, disabled, icon, iconClassName, className } = props;

  const handleClick = () => {
    if (disabled) return;

    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={classes(
        className,
        styles.container,
        icon && styles.iconContainer,
        disabled && styles.disabled
      )}
    >
      {label}

      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={classes(styles.icon, iconClassName)}
        />
      )}
    </div>
  );
};
