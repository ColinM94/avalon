import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { classes } from "utils";
import { Heading } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const InputCheckbox = (props: Props) => {
  const { value, setValue, heading, headingSubtitle, className } = props;

  const handleClick = () => {
    setValue(!value);
  };

  return (
    <div onClick={handleClick} className={classes(styles.container, className)}>
      {heading && (
        <Heading headingTitle={heading} headingSubtitle={headingSubtitle} />
      )}

      <div className={styles.iconContainer}>
        {value && <FontAwesomeIcon icon="check" className={styles.icon} />}
      </div>
    </div>
  );
};
