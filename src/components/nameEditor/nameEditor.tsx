import * as React from "react";

import { Button, InputText } from "components";
import { updateDocument } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const NameEditor = (props: Props) => {
  const { show, setShow, playerId, lobbyId, nameDefault } = props;

  const [name, setName] = React.useState(nameDefault);

  const handleSave = async () => {
    setShow(false);

    await updateDocument({
      id: lobbyId,
      collection: "lobbies",
      data: {
        [`players.${playerId}.name`]: name,
      },
    });
  };

  if (!show) return;

  return (
    <>
      <div onClick={() => setShow(false)} className={styles.background} />

      <div className={styles.container}>
        <div className={styles.heading}>Name</div>

        <InputText
          value={name}
          setValue={setName}
          inputClassName={styles.input}
        />

        <Button
          onClick={handleSave}
          label="Save"
          className={styles.saveButton}
        />
      </div>
    </>
  );
};
