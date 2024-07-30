import * as React from "react";

import { useSessionStore } from "stores";
import { goToStep } from "services";
import { Players, Divider } from "components";
import { charactersDefault } from "consts";

import styles from "./styles.module.scss";

export const GameRitual = () => {
  const {
    isAllReady,
    isMyPlayerHost,
    session,
    myPlayer,
    playersArray,
    updateSessionStore,
  } = useSessionStore();

  const myCharacter = charactersDefault[myPlayer.characterId];

  const data = () => {
    const tempData: {
      description: string;
      players: string[];
    } = {
      description: "",
      players: [],
    };

    const playerCharacterData = playersArray.map((player) => {
      const character = charactersDefault[player.characterId];

      return {
        playerId: player.id,
        characterId: player.characterId,
        allegiance: character.allegiance,
      };
    });

    const evilPlayers = (tempData.players = playerCharacterData
      .filter(
        (item) => item.allegiance === "evil" && item.playerId !== myPlayer.id
      )
      .map((player) => player.playerId));

    // const myCharacter: Character = {
    //   allegiance: "good",
    //   id: "percival",
    // };

    const characterId = myCharacter.id;

    const isMorganaPlaying = playerCharacterData.some(
      (item) => item.characterId === "morgana"
    );

    if (myCharacter.allegiance === "evil") {
      tempData.description = "You are Evil. ";

      if (characterId === "assassin") {
        tempData.description +=
          "You are the assassin. At the end of the game, if Good is about to win, you will get to assassinate who you think is Merlin. ";
      } else if (characterId === "morgana") {
        tempData.description += "You are Morgana.";
      } else {
        tempData.description +=
          "You are a minion of Mordred. You have no special powers.";
      }

      tempData.description += "Here are your fellow evil players:";

      tempData.players = evilPlayers;
    } else {
      tempData.description = "You are Good. ";

      if (characterId === "merlin") {
        tempData.description +=
          "You are the wizard Merlin, you can see which people are evil. ";

        // if (session.characters.includes("oberon")) {
        //   tempData.description += "Except for Oberon, she is unknown to you. ";
        // }

        tempData.description += "These are the evil players:";
        tempData.players = evilPlayers;
      } else if (characterId === "percival") {
        if (isMorganaPlaying) {
          tempData.description +=
            "You are Percival. You can see two people. One is Merlin and one is the evil Morgana:";
        } else {
          tempData.description +=
            "You are Percival. You can see who is Merlin. Protect them! This person is Merlin: ";
        }

        tempData.players = playerCharacterData
          .filter(
            (item) =>
              item.characterId === "morgana" || item.characterId === "merlin"
          )
          .map((item) => item.playerId);

        // const percivalPlayerId = playerCharacterData.filter(
        //   (item) => item.characterId === "merlin"
        // )[0].playerId;
      } else {
        tempData.description +=
          "You are a Loyal Servant of Arthur. You have no special powers.";
        tempData.players = [];
      }
    }

    return tempData;
  };

  React.useEffect(() => {
    if (isMyPlayerHost && isAllReady) {
      goToStep({
        step: "questMemberSelect",
      });
    }
  }, [isAllReady]);

  const validate = () => {
    if (false) return "";

    return true;
  };

  React.useEffect(() => {
    updateSessionStore({ validateReady: validate });
  }, [session.isRitualFinished]);

  return (
    <div className={styles.container}>
      <Divider description={data().description} />

      <Players playerIds={data().players.map((player) => player)} />
    </div>
  );
};
