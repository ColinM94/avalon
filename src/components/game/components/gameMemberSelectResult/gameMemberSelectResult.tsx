import * as React from "react";

import { MenuBar } from "components/menuBar/menuBar";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { classes } from "utils/classes";
import { Divider } from "components/divider/divider";
import { memberSelectResultContinue } from "services/session/logic";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameMemberSelectResult = (props: Props) => {
  const { className } = props;

  const { isMyPlayerHost, activeMemberSelectVotes, activeMemberSelectVoteIndex, activeQuest } = useSessionStore();

  const votes = Object.values(activeMemberSelectVotes).sort((a, b) => Number(b) - Number(a));

  const hasPassed = Boolean(votes.filter((vote) => vote).length > votes.length / 2);

  const renderVotes = () => {
    const items: React.ReactNode[] = [];

    votes.forEach((vote) => {
      items.push(<div className={vote ? styles.yesVote : styles.noVote}>{vote ? "Success" : "Fail"}</div>);
    });

    return items;
  };

  console.log(activeMemberSelectVoteIndex, activeQuest);

  return (
    <>
      <Divider description={hasPassed ? "The Vote has passed" : "The Vote has failed"} />

      <div className={classes(styles.container, className)}>{renderVotes()}</div>

      <MenuBar showContinue={isMyPlayerHost} onContinue={() => memberSelectResultContinue(hasPassed)} />
    </>
  );
};
