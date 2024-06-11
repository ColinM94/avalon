import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { Button, Header, InputText } from "components";
import React from "react";

export const JoinPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = React.useState("");

  const handleJoin = () => {
    if (!code) {
      alert("Please enter a lobby code");
      return;
    }

    navigate(`/lobby/${code}`);
  };

  return (
    <>
      <Header heading="Join Game" />

      <div className={styles.container}>
        <InputText value={code} setValue={setCode} placeholder="Code" />
        <Button label="Join" onClick={handleJoin} />
      </div>
    </>
  );
};
