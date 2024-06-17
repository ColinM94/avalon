import * as React from "react";
import { useParams } from "react-router-dom";

import { Button, Divider, InputText, LoadingOverlay } from "components";
import { useAppStore, useToastStore } from "stores";
import { MainLayout } from "layouts";
import { playerDefault } from "consts";
import { getDocument, updateDocument } from "services";
import { GameSession, User } from "types";

import { JoinScanner } from "./components/joinScanner/joinScanner";
import styles from "./styles.module.scss";

export const JoinPage = () => {
  const { sessionId } = useParams();
  const { showToast } = useToastStore();
  const { user } = useAppStore();

  const [code, setCode] = React.useState("");
  const [showScanner, setShowScanner] = React.useState(false);

  React.useEffect(() => {
    if (sessionId) {
      alert(sessionId);
      handleJoin(sessionId);
    }
  }, [sessionId]);

  const handleJoin = async (code: string) => {
    try {
      if (!code) throw "Invalid code!";

      const id = sessionId || code;

      const session = await getDocument<GameSession>({
        id,
        collection: "sessions",
      });

      if (!session) throw `Game ${id} not found!`;

      const isAlreadyInLobby = session.players[user.id];

      if (
        !isAlreadyInLobby &&
        Object.values(session.players).length >= session.numPlayers
      ) {
        throw "The game is full!";
      }

      if (!isAlreadyInLobby && session.step !== "lobby") {
        throw "This game has already started!";
      }

      await updateDocument<User>({
        id: user.id,
        collection: "users",
        data: {
          sessionId: id,
        },
      });

      if (
        !isAlreadyInLobby &&
        !session.players[user.id] &&
        session?.step === "lobby"
      ) {
        await updateDocument({
          id: id,
          collection: "sessions",
          data: {
            [`players.${user.id}`]: {
              ...playerDefault(),
              id: user.id,
              name: user.name || "Player",
              joinedAt: Date.now(),
            },
          },
        });
      }
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  const openCamera = () => {
    setShowScanner(true);
  };

  if (sessionId) return <LoadingOverlay />;

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
          onScanSuccess={(value) => handleJoin(value)}
          className={styles.scanner}
        />

        <Button label="Scan" onClick={openCamera} />
      </div>

      <Divider label="or" className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.instruction}>Enter the Game Code</div>

        <InputText
          type="number"
          value={code}
          setValue={setCode}
          placeholder="Code"
          onEnterClick={() => handleJoin(code)}
        />

        <Button label="Join" onClick={() => handleJoin(code)} />
      </div>
    </MainLayout>
  );
};
