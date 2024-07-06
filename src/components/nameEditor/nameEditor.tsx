import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Heading, InputText, Modal } from "components";
import { getFileUrl, updateMyPlayer, uploadFile } from "services";
import { useSessionStore } from "stores";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const NameEditor = (props: Props) => {
  const { show, setShow } = props;

  const { myPlayer, session } = useSessionStore();

  const imageInputRef = React.useRef<HTMLInputElement | null>(null);

  const [image, setImage] = React.useState<File>();
  const [name, setName] = React.useState(myPlayer.name);

  React.useEffect(() => {
    setName(name);
  }, [myPlayer.name]);

  const handleSave = async () => {
    let url;

    if (image) {
      await uploadFile(image, `images/${session.id}/${myPlayer.id}.png`);
      url = await getFileUrl(`images/${session.id}/${myPlayer.id}.png`);
    }

    updateMyPlayer({
      name,
      imageUrl: url,
    });

    setShow(false);
  };

  const fileUrl = image ? URL.createObjectURL(image) : null;

  if (!show) return;

  return (
    <>
      <div onClick={() => setShow(false)} className={styles.background} />

      <Modal show={show} setShow={setShow} className={styles.container}>
        <Heading headingTitle="Your Info" />

        <div
          onClick={() => imageInputRef.current?.click()}
          className={styles.photo}
        >
          {(fileUrl || myPlayer.imageUrl) && (
            <img src={fileUrl || myPlayer.imageUrl} className={styles.image} />
          )}

          {!myPlayer.imageUrl && !image && (
            <FontAwesomeIcon icon="camera" className={styles.photoIcon} />
          )}
        </div>

        <input
          type="file"
          accept="image/png"
          capture="user"
          onChange={(e) => setImage(e.target.files?.[0])}
          ref={imageInputRef}
          className={styles.imageInput}
        />

        <InputText
          value={name}
          setValue={setName}
          type="text"
          onEnterClick={handleSave}
          placeholder="Name"
          inputClassName={styles.input}
        />

        <Button
          onClick={handleSave}
          label="Save"
          className={styles.saveButton}
        />
      </Modal>
    </>
  );
};
