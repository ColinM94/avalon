import { classes } from "utils";
import { Button } from "components";
import { useSessionStore, useToastStore } from "stores";
import { updateMyPlayer } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const MenuBarReadyButton = ({ onClick }: Props) => {
  const { isMyPlayerHost, canContinue, canReady, onContinue, onReady } =
    useSessionStore();
  const { showToast } = useToastStore();

  const handleCanReady = (alertUser: boolean) => {
    if (!canReady) return;

    const result = canReady?.();

    if (result === true || result === false) return result;

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

  if (isMyPlayerHost) {
    return (
      <Button
        label="Continue"
        onClick={handleContinue}
        onClickDisabled={handleContinue}
        disabled={canContinue?.() !== true}
        className={classes(styles.container, !canContinue && styles.disabled)}
      />
    );
  }

  return (
    <Button
      label={"Ready"}
      onClick={handleReady}
      onClickDisabled={() => handleCanReady(true)}
      disabled={canReady?.() !== true}
      className={classes(styles.container, !canReady && styles.disabled)}
    />
  );
};
