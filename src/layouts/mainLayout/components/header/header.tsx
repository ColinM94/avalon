import { useLocation } from "wouter";

import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { Button } from "components/button/button";
import { leaveSession } from "services/session/leaveSession";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Header = (props: Props) => {
  const { headingTitle, showBackButton } = props;

  const { sessionId } = useSessionStore();

  const [, navigate] = useLocation();

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

      <div className={styles.heading}>
        <div className={styles.headingTitle}>{headingTitle}</div>
      </div>

      {sessionId && (
        <Button icon="x" onClick={leaveSession} className={styles.closeButton} iconClassName={styles.buttonIcon} />
      )}
    </div>
  );
};
