import * as React from "react";

import { Button, InputText } from "components";
import { updatePlayer } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const NameEditor = (props: Props) => {
  const { show, setShow, user, session } = props;

  const [name, setName] = React.useState(user.name);

  const handleSave = async () => {
    setShow(false);

    updatePlayer(user.id, session, {
      name,
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
          type="text"
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
