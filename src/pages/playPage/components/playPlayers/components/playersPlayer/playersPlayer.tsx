import * as React from "react";

import { classes } from "utils";
import { NameEditor } from "components";
import { useAppStore } from "stores";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const PlayersPlayer = (props: Props) => {
  const { player, connected, isHost, className } = props;

  const { user } = useAppStore();

  const [showNameEditor, setShowNameEditor] = React.useState(false);

  return (
    <>
      {player.id === user.id && (
        <NameEditor
          show={showNameEditor}
          setShow={setShowNameEditor}
          nameDefault={user.name}
          userId={user.id}
        />
      )}

      <div
        onClick={() => setShowNameEditor(true)}
        className={classes(
          className,
          styles.container,
          connected && styles.connected,
          isHost && styles.host
        )}
      >
        {connected ? player.name : "..."}
      </div>
    </>
  );
};
