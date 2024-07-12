import { Button } from "components";
import { classes } from "utils";
import { updateMyPlayer } from "services";
import { useSessionStore, useToastStore } from "stores";

import { BottomBarMenuButton } from "./components/button/bottomBarMenuButton";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const BottomBar = (props: Props) => {
  const { onClick, disabled, className } = props;

  const { myPlayer, validateReady } = useSessionStore();
  const { showToast } = useToastStore();

  const handleReady = () => {
    try {
      if (validateReady && validateReady() !== true) return;

      console.log(validateReady);

      if (onClick) {
        // if (disabled) {
        //   onClickDisabled?.();
        //   return;
        // }

        onClick();
        return;
      }

      updateMyPlayer({
        isReady: true,
      });
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  const handleClick = () => {};

  return (
    <>
      <div className={classes(styles.container, className)}>
        <BottomBarMenuButton />

        <Button
          label="Ready"
          onClick={handleReady}
          onClickDisabled={handleReady}
          disabled={disabled}
          className={classes(
            styles.readyButton,
            (myPlayer.isReady || disabled) && styles.disabled
          )}
        />

        <div className={styles.rightSpace} />
      </div>
    </>
  );
};
