import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const InputNumber = (props: Props) => {
  const { value, setValue, className } = props;

  const classNames = classes(styles.container, className);

  // const handleIncrement = () => {
  //   if (max && value >= max) return;
  //   setValue(value + 1);
  // };

  // const handleDecrement = () => {
  //   if (min && value <= min) return;

  //   setValue(value - 1);
  // };

  return (
    <div className={classNames}>
      {/* <div onClick={handleDecrement} className={styles.incrementButton}>
        -
      </div> */}
      <input
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className={styles.input}
      />
      {/* <div onClick={handleIncrement} className={styles.incrementButton}>
        +
      </div> */}
    </div>
  );
};
