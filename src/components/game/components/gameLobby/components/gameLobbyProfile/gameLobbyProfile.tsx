import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { InputText } from "components/inputText/inputText";
import { updateDocument } from "services/firestore/updateDocument";
import { getFileUrl } from "services/storage/getFileUrl";
import { uploadFile } from "services/storage/uploadFile";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { User } from "types/user";
import { classes } from "utils/classes";
import { Button } from "components/button/button";
import { updateMyPlayer } from "services/session/updateMyPlayer";

import styles from "./styles.module.scss";
import { Props } from "./types";
import { useAppStore } from "stores/useAppStore/useAppStore";

export const GameLobbyProfile = ({ className }: Props) => {
  const { showToast } = useAppStore();
  const { myPlayer, sessionId } = useSessionStore();

  const imageInputRef = React.useRef<HTMLInputElement | null>(null);

  const [name, setName] = React.useState(myPlayer.name);
  const [image, setImage] = React.useState<File>();

  const fileUrl = image ? URL.createObjectURL(image) : null;

  const isNameChanged = name !== myPlayer.name;

  React.useEffect(() => {
    if (!image) return;

    void (async () => {
      const imagePath = `images/${sessionId}/${myPlayer.id}.png`;

      await uploadFile(image, imagePath);
      const url = await getFileUrl(imagePath);

      void updateMyPlayer({
        imageUrl: url || "",
      });

      void updateDocument<User>({
        collection: "users",
        id: myPlayer.id,
        data: {
          imageUrl: url || "",
        },
      });
    })();
  }, [image]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(myPlayer.name);
  }, [myPlayer.name]);

  const handleSave = async () => {
    await updateMyPlayer({ name });
    showToast("Name Saved!");
  };

  return (
    <div className={classes(styles.container, className)}>
      <div onClick={() => imageInputRef.current?.click()} className={styles.avatar}>
        {(fileUrl || myPlayer.imageUrl) && <img src={fileUrl || myPlayer.imageUrl} className={styles.avatarImage} />}
        {!myPlayer.imageUrl && !image && <FontAwesomeIcon icon="camera" className={styles.avatarIcon} />}
        {(myPlayer.imageUrl || image) && <FontAwesomeIcon icon="pencil" className={styles.editIcon} />}

        <input
          type="file"
          accept="image/png"
          capture="user"
          onChange={(e) => setImage(e.target.files?.[0])}
          ref={imageInputRef}
          className={styles.imageInput}
        />
      </div>

      <InputText
        value={name}
        setValue={setName}
        placeholder="Your Name"
        maxLength={10}
        rightLabel={`${name.length}/10`}
        inputClassName={styles.nameInput}
        className={styles.name}
      />

      <Button icon="save" disabled={myPlayer.name === name} onClick={handleSave} className={styles.saveButton} />
    </div>
  );
};
