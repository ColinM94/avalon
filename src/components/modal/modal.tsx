import { Button } from "components";
import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Modal = (props: Props) => {
  const { show, setShow, children, className } = props;

  return (
    <>
      <div
        onClick={() => setShow(false)}
        className={classes(
          styles.background,
          show ? styles.backgroundShown : styles.backgroundHidden
        )}
      >
        <Button
          icon="x"
          onClick={() => setShow(false)}
          className={styles.closeButton}
        />
      </div>

      <div
        className={classes(
          styles.container,
          show ? styles.containerShown : styles.containerHidden,
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
