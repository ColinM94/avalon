import * as React from "react";

import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { Divider } from "components/divider/divider";
import { MenuBar } from "components/menuBar/menuBar";
import { classes } from "utils/classes";
import { questResultCanReady, questResultContinue, questResultReady } from "services/session/logic";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestResult = (props: Props) => {
  const { className } = props;

  const { activeQuest, isMyPlayerHost, myPlayer } = useSessionStore();

  const votes = Object.values(activeQuest.votesToSucceed).sort((a, b) => Number(b) - Number(a));

  const hasPassed = !votes.some((vote) => !vote);

  const renderVotes = () => {
    const items: React.ReactNode[] = [];

    votes.forEach((vote, index) => {
      items.push(
        <div key={index} className={vote ? styles.yesVote : styles.noVote}>
          {vote ? "Success" : "Fail"}
        </div>,
      );
    });

    return items;
  };

  return (
    <>
      <Divider description={hasPassed ? "The Quest has Succeeded" : "The Quest has Failed"} />

      <div className={classes(styles.container, className)}>{renderVotes()}</div>

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={() => true}
        canReady={() => questResultCanReady(myPlayer.id)}
        onContinue={() => questResultContinue(hasPassed)}
        onReady={() => questResultReady(myPlayer.id)}
      />
    </>
  );
};
