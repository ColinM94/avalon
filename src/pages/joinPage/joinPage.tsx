import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Divider, InputText } from "components";
import { useToastStore } from "stores";
import { MainLayout } from "layouts";
import { joinSession } from "services";

import { JoinScanner } from "./components/joinScanner/joinScanner";
import styles from "./styles.module.scss";

export const JoinPage = () => {
  const { sessionId } = useParams();
  const { showToast } = useToastStore();

  const [code, setCode] = React.useState("");
  const [showScanner, setShowScanner] = React.useState(false);

  if (sessionId) {
    joinSession(sessionId);

    return <div className={styles.joiningMessage}>...joining</div>;
  }

  const handleJoin = async () => {
    setCode("");

    if (!code) {
      showToast("Please enter a code!", "error");
      return;
    }

    await joinSession(code);
  };

  const openCamera = () => {
    setShowScanner(true);
  };

  return (
    <MainLayout
      showHeader
      showBackButton
      heading="Join Game"
      className={styles.container}
    >
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

        <InputText
          type="number"
          value={code}
          setValue={setCode}
          placeholder="Code"
          onEnterClick={handleJoin}
        />

        <Button label="Join" onClick={() => handleJoin()} />
      </div>
    </MainLayout>
  );
};
