import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const InputText = (props: Props) => {
  const {
    value,
    setValue,
    type = "text",
    placeholder,
    onEnterClick,
    inputClassName,
    className,
  } = props;

  const classNames = classes(styles.container, className);

  return (
    <div className={classNames}>
      <input
        type={type}
        value={value}
        inputMode={type === "text" ? "text" : "numeric"}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnterClick?.()}
        className={classes(styles.input, inputClassName)}
      />
    </div>
  );
};
