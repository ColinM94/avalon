import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";

export const LoadingOverlay = () => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon="spinner" className={styles.icon} />
    </div>
  );
};
