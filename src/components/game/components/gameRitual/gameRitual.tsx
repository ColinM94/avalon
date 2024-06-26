import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "components";
import { classes } from "utils";
import { useSessionStore, useToastStore } from "stores";
import { updateMyPlayer, updateSession } from "services";

import styles from "./styles.module.scss";

const instructions = [
  "1. Everyone close your eyes and extend your hand into a fist in front of you.",
  "2. Minions of Mordred, open your eyes and look around so you know the agents of evil.",
  "3. Minions of Mordred, close your eyes.",
  "4. Minions of Mordred, extend your thumb so Merlin will know of you.",
  "5. Merlin, open your eyes so you will know the agents of evil.",
  "6. Minions of Mordred, put your thumbs down. Merlin, close your eyes.",
  "7. Everyone, open your eyes.",
];

export const GameRitual = () => {
  const { isAllReady, isHost } = useSessionStore();
  const { showToast } = useToastStore();
  const audioPlayer = React.useRef<HTMLAudioElement | null>(null);
  const currentInstruction = React.useRef(-1);

  const [audio, setAudio] = React.useState();
  const [isPaused, setIsPaused] = React.useState(true);

  const handleRestart = () => {
    setIsPaused(true);
    setAudio(undefined);
    currentInstruction.current = -1;
  };

  const handlePlay = () => {
    if (!audioPlayer.current) return;

    if (!audio) {
      handleNextStep();
    }

    setIsPaused(false);
    audioPlayer.current.play();
  };

  const handlePause = () => {
    if (!audioPlayer.current) return;

    setIsPaused(true);
    audioPlayer.current.pause();
  };

  const setIsFinished = async (isFinished: boolean) => {
    const result = await updateSession({
      isRitualFinished: isFinished,
    });

    if (!result) showToast("Error finishing Ritual", "error");
  };

  const handleNextStep = async () => {
    setIsFinished(false);
    currentInstruction.current += 1;

    if (currentInstruction.current === instructions.length) {
      setAudio(undefined);
      setIsFinished(true);
      setIsPaused(true);
      currentInstruction.current = -1;
      return;
    }

    const file = await import(
      `assets/audio/ritual/${currentInstruction.current}.m4a`
    );

    setAudio(file.default);
  };

  React.useEffect(() => {
    if (!audioPlayer.current) return;

    audioPlayer.current.playbackRate = 2;

    audioPlayer.current.pause();
    audioPlayer.current.load();
    audioPlayer.current.play();
  }, [audio]);

  // const handleStartGame = () => {
  //   updateDocument<GameSession>({
  //     id: session.id,
  //     collection: "sessions",
  //     data: {
  //       step: "quests",
  //     },
  //   });
  // };

  const handleAllReady = async () => {
    updateSession({
      step: "quests",
    });
  };

  React.useEffect(() => {
    if (isHost && isAllReady) handleAllReady();
  }, [isAllReady]);

  return (
    <div className={styles.container}>
      {isHost && (
        <>
          <audio
            controls
            ref={audioPlayer}
            onEnded={handleNextStep}
            className={styles.audioPlayer}
          >
            <source src={audio} type="audio/mpeg" />
          </audio>

          {
            <div className={styles.instructions}>
              {instructions.map((instruction, index) => (
                <div
                  key={index}
                  className={classes(
                    styles.instruction,
                    currentInstruction.current === index &&
                      styles.activeInstruction
                  )}
                >
                  {instruction}
                </div>
              ))}

              <div className={styles.buttons}>
                <div
                  onClick={isPaused ? handlePlay : handlePause}
                  className={styles.playButton}
                >
                  <FontAwesomeIcon
                    icon={isPaused ? "play" : "pause"}
                    className={styles.playButtonIcon}
                  />
                </div>

                <div
                  onClick={() => handleRestart()}
                  className={styles.playButton}
                >
                  <FontAwesomeIcon
                    icon="arrow-rotate-backward"
                    className={styles.playButtonIcon}
                  />
                </div>
              </div>
            </div>
          }
        </>
      )}

      {!isHost && (
        <div className={styles.description}>
          The Host will perform the ritual!
        </div>
      )}

      <Button
        label="Ready"
        onClick={() =>
          updateMyPlayer({
            isReady: true,
          })
        }
        // disabled={
        //   !session.isRitualFinished || session.players[user.id].isReadyRitual
        // }
        className={styles.readyButton}
      />
    </div>
  );
};
