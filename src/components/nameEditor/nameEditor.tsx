import * as React from "react";

import { Button, InputText } from "components";
import { updateMyPlayer } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const NameEditor = (props: Props) => {
  const { show, setShow, nameDefault } = props;

  const [name, setName] = React.useState(nameDefault);

  const handleSave = async () => {
    setShow(false);

    updateMyPlayer({
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
