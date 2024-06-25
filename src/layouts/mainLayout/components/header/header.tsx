import { useNavigate } from "react-router-dom";

import { Button } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Header = (props: Props) => {
  const { heading, showBackButton, onCloseClick } = props;

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {showBackButton && (
        <Button
          icon="arrow-left"
          onClick={() => navigate("/")}
          className={styles.backButton}
          iconClassName={styles.buttonIcon}
        />
      )}

      <div className={styles.heading}>{heading}</div>

      {onCloseClick && (
        <Button
          icon="x"
          onClick={onCloseClick}
          className={styles.closeButton}
          iconClassName={styles.buttonIcon}
        />
      )}
    </div>
  );
};
