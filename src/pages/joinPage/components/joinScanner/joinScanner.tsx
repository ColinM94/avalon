import { useNavigate } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";

import { Modal } from "components";
import { useToastStore } from "stores";
import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const JoinScanner = (props: Props) => {
  const { showScanner, setShowScanner, className } = props;

  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const handleScan = (value: string) => {
    const sessionCode = value.substring(value.length - 4);

    if (!/^\d{4}$/.test(sessionCode)) {
      showToast("Error scanning QR Code");
      return;
    }

    navigate(`/lobby/${sessionCode}`);
  };

  if (!showScanner) return null;

  return (
    <Modal
      show={showScanner}
      setShow={setShowScanner}
      className={classes(styles.container, className)}
    >
      {showScanner && (
        <Scanner
          onScan={(result) => handleScan(result[0].rawValue)}
          allowMultiple
        />
      )}
    </Modal>
  );
};
