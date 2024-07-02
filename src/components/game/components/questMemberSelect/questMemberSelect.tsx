import * as React from "react";

import { classes, sentencifyArray } from "utils";
import { Button, LoadingOverlay } from "components";
import { useSessionStore, useToastStore } from "stores";
import { updateActiveQuest, updateSession } from "services";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestMemberSelect = (props: Props) => {
  const { className } = props;

  const { players, playersArray, myPlayer, session, activeQuest } =
    useSessionStore();

  const { showToast } = useToastStore();

  React.useEffect(() => {
    if (
      activeQuest?.index === session.activeQuestIndex &&
      activeQuest.leaderId
    ) {
      return;
    }

    updateActiveQuest({
      leaderId: Object.values(players)[0].id,
    });
  }, [session.activeQuestIndex]);

  const isMaxPlayers = activeQuest.players.length >= activeQuest.numPlayers;

  const handleClick = (playerId: string) => {
    if (activeQuest.leaderId !== myPlayer.id) return;

    const updatedQuestPlayers = activeQuest.players;

    if (updatedQuestPlayers.includes(playerId)) {
      updatedQuestPlayers.splice(updatedQuestPlayers.indexOf(playerId), 1);
    } else if (!isMaxPlayers) {
      updatedQuestPlayers.push(playerId);
    } else {
      return;
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
            They are selecting {activeQuest.numPlayers} player(s) to go on Quest{" "}
            {activeQuest.index + 1}
          </div>
        </div>
      )}

      <div className={styles.playersSelect}>
        <div className={styles.playersSentence}>
          {sentencifyArray(
            playersArray
              .filter((player) => activeQuest.players?.includes(player.id))
              .map((player) => player.name)
          )}
          {activeQuest.players.length > 0 && " will go on the quest."}
        </div>

        <div className={styles.players}>
          {playersArray.map((player) => {
            const isSelected = activeQuest.players.includes(player.id);

            return (
              <div
                onClick={() => handleClick(player.id)}
                key={player.id}
                className={classes(
                  styles.player,
                  isSelected && styles.playerSelected,
                  !isSelected && isMaxPlayers && styles.playerDisabled
                )}
              >
                {player.name}
              </div>
            );
          })}
        </div>
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
