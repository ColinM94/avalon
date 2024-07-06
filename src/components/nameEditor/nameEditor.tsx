import * as React from "react";

import { Button, Heading, InputText, Modal } from "components";
import { getFileUrl, updateMyPlayer, uploadFile } from "services";
import { useSessionStore } from "stores";

import styles from "./styles.module.scss";
import { Props } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NameEditor = (props: Props) => {
  const { show, setShow, onSaveSuccess } = props;

  const { myPlayer, session } = useSessionStore();

  const imageInputRef = React.useRef<HTMLInputElement | null>(null);

  const [image, setImage] = React.useState<File>();
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [name, setName] = React.useState(myPlayer.name);

  React.useEffect(() => {
    setName(name);
  }, [myPlayer.name]);

  const handleSave = async () => {
    if (image) {
      await uploadFile(image, `images/${session.id}/${myPlayer.id}.png`);
      const url = await getFileUrl(`images/${session.id}/${myPlayer.id}.png`);
      setImageUrl(url);
    }

    updateMyPlayer({
      name,
    });

    setShow(false);

    onSaveSuccess?.();
  };

  const getImageUrl = async () => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      return;
    }

    const url = await getFileUrl(`images/${session.id}/${myPlayer.id}.png`);
    if (!url) return;

    setImageUrl(url);
  };

  React.useEffect(() => {
    getImageUrl();
  }, [image]);

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
          {imageUrl && <img src={imageUrl} className={styles.image} />}

          {!imageUrl && !image && (
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
