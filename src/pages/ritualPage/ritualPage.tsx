import * as React from "react";

import { Button, Header } from "components";
import { classes } from "utils";

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

export const RitualPage = () => {
  const audioPlayer = React.useRef<HTMLAudioElement | null>(null);
  const currentInstruction = React.useRef(-1);

  const [audio, setAudio] = React.useState();
  const [isFinished, setIsFinished] = React.useState(false);

  const handleNextStep = async () => {
    setIsFinished(false);
    currentInstruction.current += 1;

    if (currentInstruction.current === instructions.length) {
      setAudio(undefined);
      setIsFinished(true);
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

  return (
    <>
      <Header heading="Pre-game Ritual" hideBackButton />

      <div className={styles.container}>
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

            <Button
              label={isFinished ? "Restart Ritual" : "Start Ritual"}
              onClick={handleNextStep}
              className={styles.startButton}
            />
          </div>
        }

        <Button
          label="Start Game"
          onClick={handleNextStep}
          disabled={!isFinished}
          className={styles.startButton}
        />
      </div>
    </>
  );
};
