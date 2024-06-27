import * as React from "react";

import { classes, sentencifyArray } from "utils";
import { Button, LoadingOverlay } from "components";
import { useSessionStore, useToastStore } from "stores";
import { updateSession } from "services";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsVote = (props: Props) => {
  const { activeQuest, className } = props;

  const { isHost, players, myPlayer, session } = useSessionStore();

  const { showToast } = useToastStore();

  // React.useEffect(() => {
  //   if (isHost && !activeQuest) {
  //     updateSession({
  //       quests: {
  //         ...session.quests,
  //         0: {
  //           ...session.quests[0],
  //           leaderId: players[0].id,
  //         },
  //       },
  //     });
  //   }
  // }, []);

  const handleClick = (playerId: string) => {
    if (session.leaderId !== myPlayer.id) return;

    const updatedQuestPlayers = activeQuest.players;

    if (updatedQuestPlayers.includes(playerId)) {
      updatedQuestPlayers.splice(updatedQuestPlayers.indexOf(playerId), 1);
    } else {
      updatedQuestPlayers.push(playerId);
    }

    const updatedQuests = structuredClone(session.quests);

    updatedQuests[activeQuest.index].players = updatedQuestPlayers;

    updateSession({
      quests: updatedQuests,
    });
  };

  const handleContinue = () => {
    try {
      if (activeQuest.numPlayers !== activeQuest.players.length) {
        throw `Please select ${activeQuest.numPlayers} players.`;
      }
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  if (!activeQuest.leaderId) return <LoadingOverlay />;

  return (
    <div className={classes(styles.container, className)}>
      {activeQuest.leaderId === myPlayer.id && (
        <div className={styles.explanation}>
          <div className={styles.explanationHeading}>You are Leader</div>
          <div className={styles.explanationDescription}>
            Vote for {activeQuest.numPlayers} player(s) to go on Quest{" "}
            {activeQuest.index + 1}
          </div>
        </div>
      )}

      {activeQuest.leaderId !== myPlayer.id && (
        <div className={styles.explanation}>
          <div className={styles.explanationHeading}>
            {players[activeQuest.leaderId].name} is Leader
          </div>
          <div className={styles.explanationDescription}>
            They are voting for {activeQuest.index + 1} player(s) to go on Quest{" "}
            {activeQuest.index + 1}
          </div>
        </div>
      )}

      <div>
        {sentencifyArray(
          Object.values(players)
            .filter((player) => activeQuest.players.includes(player.id))
            .map((player) => player.name)
        )}
        will go on the quest.
      </div>

      <div className={styles.players}>
        {Object.values(players).map((player) => {
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

      {activeQuest.leaderId === myPlayer.id && (
        <Button
          label="Continue"
          onClick={handleContinue}
          disabled={activeQuest.players.length !== activeQuest.numPlayers}
        />
      )}
    </div>
  );
};
