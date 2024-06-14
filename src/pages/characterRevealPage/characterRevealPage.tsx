import * as React from "react";
import { useNavigate } from "react-router-dom";

import { MainLayout } from "layouts";
import { Button, CharacterRevealer } from "components";
import { useAppStore } from "stores";

import styles from "./styles.module.scss";

export const CharacterRevealPage = () => {
  const navigate = useNavigate();
  const { user, session } = useAppStore();

  if (!session) {
    navigate("/");
    return;
  }

  const [showCharacter, setShowCharacter] = React.useState(false);
  const [hasViewedCharacter, setHasViewedCharacter] = React.useState(false);

  const myPlayer = session.players[user.id];
  const myCharacterId = session.players?.[user.id]?.characterId || undefined;

  return (
    <MainLayout showLeaveButton className={styles.container}>
      <CharacterRevealer
        characterId={session.players[user.id].characterId}
        show={showCharacter}
        setShow={setShowCharacter}
        onReveal={() => setHasViewedCharacter(true)}
      />

      <Button
        label="View Character"
        onClick={() => setShowCharacter(true)}
        className={styles.readyButton}
      />
    </MainLayout>
  );
};
