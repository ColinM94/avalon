import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Divider, Header, InputText } from "components";
import { useToastStore } from "stores";

import { JoinScanner } from "./components/joinScanner/joinScanner";
import styles from "./styles.module.scss";

export const JoinPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const [code, setCode] = React.useState("");
  const [showScanner, setShowScanner] = React.useState(false);

  const handleJoin = () => {
    if (!code) {
      showToast("Please enter a code!");
      return;
    }

    navigate(`/lobby/${code}`);
  };

  const openCamera = () => {
    setShowScanner(true);
  };

  return (
    <>
      <Header heading="Join Game" />

      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.instruction}>Scan QR Code</div>

          <JoinScanner
            showScanner={showScanner}
            setShowScanner={setShowScanner}
            className={styles.scanner}
          />

          <Button label="Scan" onClick={openCamera} />

          {/*
          <input
            type="file"
            accept="image/*"
            capture="environment"
            id="cameraInput"
            ref={cameraInputRef}
            style={{ display: "none" }}
          /> */}
        </div>

        <Divider label="or" className={styles.divider} />

        <div className={styles.section}>
          <div className={styles.instruction}>Enter the Game Code</div>
          <InputText value={code} setValue={setCode} placeholder="Code" />
          <Button label="Join" onClick={() => handleJoin()} />
        </div>
      </div>
    </>
  );
};
