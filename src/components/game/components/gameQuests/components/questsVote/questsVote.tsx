import * as React from "react";

import { classes, sentencifyArray } from "utils";
import { Button, LoadingOverlay } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsVote = (props: Props) => {
  const { state, activeQuest, className } = props;

  React.useEffect(() => {
    if (state.isHost && !state.session.leaderId) {
      state.updateSession({
        quests: {
          ...state.session.quests,
          0: {
            ...state.session.quests[0],
            leaderId: state.players[0].id,
          },
        },
      });
    }
  }, []);

  const handleClick = (playerId: string) => {
    if (activeQuest.leaderId !== state.myPlayer.id) return;

    const updatedQuestPlayers = activeQuest.players;

    if (updatedQuestPlayers.includes(playerId)) {
      updatedQuestPlayers.splice(updatedQuestPlayers.indexOf(playerId), 1);
    } else {
      updatedQuestPlayers.push(playerId);
    }

    state.updateSession({
      quests: {
        ...state.session.quests,
        [activeQuest.index]: {
          ...activeQuest,
          players: updatedQuestPlayers,
        },
      },
    });
  };

  const handleContinue = () => {};

  if (!activeQuest.leaderId) return <LoadingOverlay />;

  return (
    <div className={classes(styles.container, className)}>
      {activeQuest.leaderId === state.myPlayer.id && (
        <div className={styles.explanation}>
          <div className={styles.explanationHeading}>You are Leader</div>
          <div className={styles.explanationDescription}>
            Vote for {activeQuest.numPlayers} player(s) to go on Quest{" "}
            {activeQuest.index + 1}
          </div>
        </div>
      )}

      {activeQuest.leaderId !== state.myPlayer.id && (
        <div className={styles.explanation}>
          <div className={styles.explanationHeading}>
            {state.session.players[activeQuest.leaderId].name} is Leader
          </div>
          <div className={styles.explanationDescription}>
            They are voting for {activeQuest.index + 1} player(s) to go on Quest{" "}
            {activeQuest.index + 1}
          </div>
        </div>
      )}

      <div>
        {sentencifyArray(
          state.players
            .filter((player) => activeQuest.players.includes(player.id))
            .map((player) => player.name)
        )}
        will go on the quest.
      </div>

      <div className={styles.players}>
        {state.players.map((player) => {
          return (
            <div
              onClick={() => handleClick(player.id)}
              key={player.id}
              className={classes(
                styles.player,
                activeQuest.players.includes(player.id) && styles.playerSelected
              )}
            >
              {player.name}
            </div>
          );
        })}
      </div>

      {activeQuest.leaderId === state.myPlayer.id && (
        <Button
          label="Continue"
          onClick={handleContinue}
          disabled={activeQuest.players.length !== activeQuest.numPlayers}
        />
      )}
    </div>
  );
};
