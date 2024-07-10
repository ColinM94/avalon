import { Button } from "components";
import { classes } from "utils";
import { updateMyPlayer } from "services";
import { useSessionStore, useToastStore } from "stores";

import { BottomBarMenuButton } from "./components/button/bottomBarMenuButton";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const BottomBar = (props: Props) => {
  const { onClick, onClickDisabled, disabled, className } = props;

  const { myPlayer, playersArray, session } = useSessionStore();
  const { showToast } = useToastStore();

  const handleReady = () => {
    try {
      if (session.step === "lobby") {
        if (!myPlayer.name) {
          throw "You must enter a name";
        }

        if (
          playersArray
            .filter((player) => player.id !== myPlayer.id)
            .some(
              (player) =>
                player.name.toLocaleLowerCase() ===
                myPlayer.name.toLocaleLowerCase()
            )
        ) {
          throw "This name is taken";
        }
      }

      if (session.step === "characterReveal") {
      }

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
