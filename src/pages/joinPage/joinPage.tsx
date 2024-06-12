import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";

import { Button, Divider, Header, InputText, Modal } from "components";

import styles from "./styles.module.scss";

export const JoinPage = () => {
  const navigate = useNavigate();

  const cameraInputRef = React.useRef<HTMLInputElement | null>(null);

  const [code, setCode] = React.useState("");
  const [showScanner, setShowScanner] = React.useState(false);

  const handleJoin = () => {
    if (!code) {
      alert("Please enter a code");
      return;
    }

    navigate(`/lobby/${code}`);
  };

  const handleScan = (value: string) => {
    console.log(value);
    const sessionCode = value.substring(value.length - 4);
    console.log(sessionCode);

    if (!/^\d{4}$/.test(sessionCode)) {
      alert("Error scanning QR Code");
      return;
    }

    navigate(`/lobby/${sessionCode}`);
  };

  const openCamera = () => {
    setShowScanner(true);
  };

  return (
    <>
      <Header heading="Join Game" />

      <Modal
        show={showScanner}
        setShow={setShowScanner}
        className={styles.scannerContainer}
      >
        <Scanner
          onScan={(result) => handleScan(result[0].rawValue)}
          allowMultiple
        />
      </Modal>

      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.instruction}>Scan QR Code</div>

          <Button
            label="Scan"
            onClick={openCamera}
            className={styles.scanButton}
          />

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
          <Button label="Join" onClick={() => handleJoin(code)} />
        </div>
      </div>
    </>
  );
};
