import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSessionStore } from "stores";
import { InputText } from "components";
import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameLobbyProfile = ({ name, setName, className }: Props) => {
  const { myPlayer } = useSessionStore();

  const imageInputRef = React.useRef<HTMLInputElement | null>(null);

  const [image, setImage] = React.useState<File>();

  const fileUrl = image ? URL.createObjectURL(image) : null;

  return (
    <>
      <div className={classes(styles.container, className)}>
        <div
          onClick={() => imageInputRef.current?.click()}
          className={styles.avatar}
        >
          {(fileUrl || myPlayer.imageUrl) && (
            <img
              src={fileUrl || myPlayer.imageUrl}
              className={styles.avatarImage}
            />
          )}

          {!myPlayer.imageUrl && !image && (
            <FontAwesomeIcon icon="camera" className={styles.avatarIcon} />
          )}

          <input
            type="file"
            accept="image/png"
            capture="user"
            onChange={(e) => setImage(e.target.files?.[0])}
            ref={imageInputRef}
            className={styles.imageInput}
          />
        </div>

        {myPlayer.isReady && <div className={styles.name}>{myPlayer.name}</div>}

        {!myPlayer.isReady && (
          <div className={styles.nameContainer}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.nameInput}
            />

            <FontAwesomeIcon icon="pencil" className={styles.editIcon} />
          </div>
        )}
      </div>
    </>
  );
};
