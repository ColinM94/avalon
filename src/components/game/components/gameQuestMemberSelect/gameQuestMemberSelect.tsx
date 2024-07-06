import * as React from "react";

import { classes } from "utils";
import { Button, LoadingOverlay } from "components";
import { useSessionStore, useToastStore } from "stores";
import { updateActiveQuest, updateSession } from "services";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestMemberSelect = (props: Props) => {
  const { className } = props;

  const {
    players,
    playersArray,
    myPlayer,
    session,
    activeQuest,
    isMyPlayerLeader,
    updateSessionStore,
  } = useSessionStore();

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

  const handleLockIn = () => {
    try {
      if (activeQuest.numPlayers !== activeQuest.players.length) {
        throw `Please select ${activeQuest.numPlayers} players.`;
      }

      updateSession({
        step: "questMemberVote",
      });
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  React.useEffect(() => {
    let subtitle = isMyPlayerLeader
      ? `Select ${activeQuest.numPlayers} people to go on the next quest`
      : `They are selecting ${activeQuest.numPlayers} player(s) to go on the next Quest`;

    updateSessionStore({
      heading: {
        title: `${players[activeQuest.leaderId]?.name} is Leader`,
        subtitle,
      },
    });
  }, [activeQuest.leaderId]);

  if (!activeQuest.leaderId) return <LoadingOverlay />;

  return (
    <div className={classes(styles.container, className)}>
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

      {isMyPlayerLeader && (
        <Button
          label="Lock In"
          onClick={handleLockIn}
          // disabled={activeQuest.players.length !== activeQuest.numPlayers}
          className={styles.lockInButton}
        />
      )}
    </div>
  );
};
