import { classes } from "utils";
import { Button } from "components";
import { useSessionStore, useToastStore } from "stores";
import { updateMyPlayer } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const MenuBarReadyButton = ({ onClick }: Props) => {
  const { myPlayer, isMyPlayerHost, isAllReady, validateReady } =
    useSessionStore();
  const { showToast } = useToastStore();

  const handleReady = () => {
    try {
      const result = validateReady?.();

      if (result !== true && result !== undefined) throw result;

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

  const isValidated = validateReady?.() === true;

  const handleContinue = () => {
    try {
      if (!isAllReady) throw "All players are not ready";
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  return (
    <Button
      label={isMyPlayerHost ? "Continue" : "Ready"}
      onClick={isMyPlayerHost ? handleReady : handleContinue}
      onClickDisabled={handleReady}
      disabled={!isValidated}
      className={classes(
        styles.container,
        (myPlayer.isReady || !isValidated) && styles.disabled
      )}
    />
  );
};
