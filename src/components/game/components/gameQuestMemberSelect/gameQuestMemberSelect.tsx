import * as React from "react";

import { classes } from "utils";
import { Divider, LoadingOverlay, PlayerCard } from "components";
import { useSessionStore } from "stores";
import { goToStep, updateActiveQuest, updateSession } from "services";

import { Props } from "./types";
import styles from "./styles.module.scss";

const getNumPlayers = (questIndex: number, totalNumPlayers: number) => {
  if (questIndex === 0) {
    if (totalNumPlayers === 5) return 2;
    if (totalNumPlayers === 6) return 2;
    if (totalNumPlayers === 7) return 2;
    if (totalNumPlayers === 8) return 3;
    if (totalNumPlayers === 9) return 3;
    if (totalNumPlayers === 10) return 3;
  }
  if (questIndex === 1) {
    if (totalNumPlayers === 5) return 3;
    if (totalNumPlayers === 6) return 3;
    if (totalNumPlayers === 7) return 3;
    if (totalNumPlayers === 8) return 4;
    if (totalNumPlayers === 9) return 4;
    if (totalNumPlayers === 10) return 4;
  }
  if (questIndex === 2) {
    if (totalNumPlayers === 5) return 2;
    if (totalNumPlayers === 6) return 4;
    if (totalNumPlayers === 7) return 3;
    if (totalNumPlayers === 8) return 4;
    if (totalNumPlayers === 9) return 4;
    if (totalNumPlayers === 10) return 4;
  }
  if (questIndex === 3) {
    if (totalNumPlayers === 5) return 4;
    if (totalNumPlayers === 6) return 3;
    if (totalNumPlayers === 7) return 4;
    if (totalNumPlayers === 8) return 5;
    if (totalNumPlayers === 9) return 5;
    if (totalNumPlayers === 10) return 5;
  }
  if (questIndex === 4) {
    if (totalNumPlayers === 5) return 4;
    if (totalNumPlayers === 6) return 4;
    if (totalNumPlayers === 7) return 4;
    if (totalNumPlayers === 8) return 5;
    if (totalNumPlayers === 9) return 5;
    if (totalNumPlayers === 10) return 5;
  }
};

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

  React.useEffect(() => {
    if (
      activeQuest?.index === session.activeQuestIndex &&
      activeQuest.leaderId
    ) {
      return;
    }

    updateActiveQuest({
      leaderId: Object.values(players)[0].id,
      numPlayers: getNumPlayers(session.activeQuestIndex, session.numPlayers),
    });
  }, [session.activeQuestIndex]);

  const isMaxPlayers = activeQuest.players.length >= activeQuest.numPlayers;

  const handleClick = (playerId: string) => {
    if (activeQuest.leaderId !== myPlayer.id || myPlayer.isReady) return;

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

  const validate = () => {
    if (!isMyPlayerLeader) {
      return "The leader must first select the quest members.";
    }

    if (activeQuest.numPlayers !== activeQuest.players.length) {
      return `Please select ${activeQuest.numPlayers} players.`;
    }

    return true;
  };

  React.useEffect(() => {
    if (!isMyPlayerLeader || !myPlayer.isReady) return;

    goToStep({
      step: "questMemberVote",
    });
  }, [myPlayer.isReady]);

  React.useEffect(() => {
    updateSessionStore({ validateReady: validate });
  }, [myPlayer.name, activeQuest.players]);

  if (!activeQuest.leaderId) return <LoadingOverlay />;

  return (
    <>
      <Divider
        description={
          isMyPlayerLeader
            ? `Select ${activeQuest.numPlayers} people to go on the this quest`
            : `${players[activeQuest.leaderId]?.name} is selecting ${
                activeQuest.numPlayers
              } player(s) to go on this Quest`
        }
      />

      <div className={classes(styles.container, className)}>
        {isMyPlayerLeader &&
          playersArray.map((player) => {
            const isSelected = activeQuest.players.includes(player.id);

            return (
              <PlayerCard
                player={player}
                onClick={() => handleClick(player.id)}
                showName
                key={player.id}
                className={classes(
                  styles.player,
                  isSelected ? styles.playerSelected : styles.playerDisabled
                )}
              />
            );
          })}
      </div>
    </>
  );
};
