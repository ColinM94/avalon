import { classes } from "utils";
import { Button } from "components";
import { useSessionStore, useToastStore } from "stores";
import { updateMyPlayer } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const MenuBarReadyButton = (props: Props) => {
  const { canReady, canContinue, onContinue, onReady } = props;

  const { isMyPlayerHost } = useSessionStore();
  const { showToast } = useToastStore();

  const handleCanReady = (alertUser: boolean) => {
    if (!canReady) return;

    const result = canReady?.();

    if (result === true) return result;

    if (alertUser) showToast(result, "error");
  };

  const handleReady = () => {
    try {
      const result = canReady?.();

      if (result !== true) throw result;

      onReady?.();

      updateMyPlayer({
        isReady: true,
      });
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  const handleContinue = () => {
    try {
      const result = canContinue?.();

      if (result !== true) throw result;

      onContinue?.();
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  if (isMyPlayerHost && onContinue) {
    return (
      <Button
        label="Continue"
        onClick={handleContinue}
        onClickDisabled={handleContinue}
        disabled={canContinue ? canContinue?.() !== true : false}
        className={classes(styles.container, !canContinue && styles.disabled)}
      />
    );
  }

  if (onReady) {
    return (
      <Button
        label={"Ready"}
        onClick={handleReady}
        onClickDisabled={() => handleCanReady(true)}
        disabled={canReady ? canReady?.() !== true : false}
        className={classes(styles.container, !canReady && styles.disabled)}
      />
    );
  }
};
