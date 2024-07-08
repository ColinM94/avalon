import { Button } from "components";
import { classes } from "utils";
import { updateMyPlayer } from "services";
import { useSessionStore } from "stores";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const ReadyButton = ({ onClick, disabled, className }: Props) => {
  const { myPlayer } = useSessionStore();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    updateMyPlayer({
      isReady: true,
    });
  };

  return (
    <Button
      label="Ready"
      onClick={handleClick}
      disabled={disabled}
      className={classes(
        className,
        styles.container,
        myPlayer.isReady && styles.disabled
      )}
    />
  );
};
