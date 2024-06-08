import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const InputText = (props: Props) => {
  const { value, setValue, placeholder, inputClassName, className } = props;

  const classNames = classes(styles.container, className);

  return (
    <div className={classNames}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={classes(styles.input, inputClassName)}
      />
    </div>
  );
};
