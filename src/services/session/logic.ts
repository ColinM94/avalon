import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { GameSession, Player } from "types/gameSession";
import { Characters } from "types/characters";
import { shuffleArray } from "utils/shuffleArray";
import { maxCharacters } from "consts/characters";
import { numPlayersByQuest } from "consts/general";
import { updateDocument } from "services/firestore/updateDocument";

import { updateActiveQuest } from "./updateActiveQuest";
import { updatePlayer } from "./updatePlayer";
import { updateSession } from "./updateSession";
import { goToStep } from "./goToStep";

// -------------
// 1. Lobby
// -------------
export const lobbyCanReady = () => {
  const { playersArray, myPlayer, isMyPlayerHost } = useSessionStore.getState();

  if (myPlayer.isReady && !isMyPlayerHost) return "You are ready";
  if (!myPlayer.name) return "You must enter a name";
  // if (!myPlayer.imageUrl) return "You must select an image"

  const filteredPlayers = playersArray.filter((player) => player.id !== myPlayer.id);

  if (filteredPlayers.some((player) => player.name.toLocaleLowerCase() === myPlayer.name.toLocaleLowerCase())) {
    return "This name is taken";
  }

  return true;
};

export const lobbyCanContinue = () => {
  const { playersArray, isAllReady } = useSessionStore.getState();

  if (playersArray.length < 5) return "There has to be at least 5 players to start";

  if (!isAllReady) return "All players are not ready";

  return true;
};

export const lobbyContinue = async () => {
  const { playersArray, numPlayers, characters, quests, sessionId } = useSessionStore.getState();

  const playerUpdates: Record<string, Partial<Player>> = {};

  playersArray.forEach((player, index) => {
    playerUpdates[player.id] = {
      characterId: characters[index] || "",
    };
  });

  const promises: Promise<boolean>[] = [];

  Object.keys(quests).forEach((questIndex) => {
    const promise = updateDocument<GameSession>({
      id: sessionId,
      collection: "sessions",
      data: {
        [`quests.${questIndex}.numPlayers`]: numPlayersByQuest[Number(questIndex)][numPlayers - 5],
      },
    });

    promises.push(promise);
  });

  await Promise.all(promises);

  await goToStep({
    step: "setup",
    playerUpdates,
  });
};

// ------------------------
// 2. Setup
// ------------------------
export const setupCanContinue = (characters: Characters) => {
  const { playersArray } = useSessionStore.getState();

  const numPlayers = playersArray.length;

  const maxGoodCharacters = maxCharacters[numPlayers]?.good;
  const maxEvilCharacters = maxCharacters[numPlayers]?.evil;

  const numActiveGoodCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "good" && character.isActive,
  ).length;

  const numActiveEvilCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "evil" && character.isActive,
  ).length;

  if (numActiveGoodCharacters > maxGoodCharacters) {
    return "You have selected too many Good characters!";
  }

  if (numActiveEvilCharacters > maxEvilCharacters) {
    return `You have selected too many evil characters`;
  }

  if (numActiveGoodCharacters < maxGoodCharacters) {
    return `You must select ${maxGoodCharacters} good characters`;
  }

  if (numActiveEvilCharacters < maxEvilCharacters) {
    return `You must select ${maxEvilCharacters} evil characters`;
  }

  return true;
};

export const setupContinue = async (characters: Characters) => {
  const { playersArray } = useSessionStore.getState();

  const shuffledCharacters = shuffleArray(
    Object.values(characters)
      .filter((character) => character.isActive)
      .map((character) => character.id),
  );

  const playerUpdates: Record<string, Partial<Player>> = {};

  playersArray.forEach((player, i) => {
    playerUpdates[player.id] = {
      characterId: shuffledCharacters[i],
    };
  });

  await goToStep({
    step: "characterReveal",
    playerUpdates,
  });
};

// ------------------------
// 3. Reveal
// ------------------------
export const revealCanContinue = (isCharacterRevealed: boolean) => {
  const { isAllReady } = useSessionStore.getState();

  if (!isCharacterRevealed) return "You must view your character first";
  if (!isAllReady) return "All players are not ready";

  return true;
};

export const revealContinue = async () => {
  const { playersArray, activeQuest, numPlayers } = useSessionStore.getState();

  await updateActiveQuest({
    numPlayers: numPlayersByQuest[activeQuest.index][numPlayers - 5],
    leaderId: playersArray[0].id,
  });

  await goToStep({
    step: "memberSelect",
  });
};

export const revealCanReady = (isCharacterRevealed: boolean) => {
  if (!isCharacterRevealed) return "You must view your character first";

  return true;
};

export const revealReady = async (playerId: string) => {
  await updatePlayer(playerId, {
    isReady: true,
  });
};

// ------------------------
// 4. Member Select
// ------------------------
export const memberSelectCanContinue = () => {
  const { activeQuest } = useSessionStore.getState();

  if (activeQuest.numPlayers !== activeQuest.players.length) {
    return `Please select ${activeQuest.numPlayers} players.`;
  }

  return true;
};

export const memberSelectContinue = async () => {
  await goToStep({
    step: "memberSelectVote",
  });
};

// ------------------------
// 5. Member Select Vote
// ------------------------
export const memberSelectVoteCanContinue = () => {
  const { isAllReady } = useSessionStore.getState();

  if (!isAllReady) return "All players are not ready";

  return true;
};

export const memberSelectVoteContinue = async () => {
  await goToStep({
    step: "memberSelectResult",
  });
};

// ------------------------
// 6. Member Select Result
// ------------------------
export const memberSelectResultContinue = async (hasPassed: boolean) => {
  const { activeQuest, playersArray, activeMemberSelectVoteIndex } = useSessionStore.getState();

  if (hasPassed) {
    await updateSession({
      activeMemberSelectVoteIndex: 0,
    });

    await goToStep({
      step: "questVote",
    });

    return;
  }

  const currentLeaderIndex = playersArray.findIndex((item) => item.id === activeQuest.leaderId);
  const newLeader = playersArray?.[currentLeaderIndex + 1] || playersArray[0];

  await updateSession({
    activeMemberSelectVoteIndex: activeMemberSelectVoteIndex + 1,
  });

  await updateActiveQuest({
    leaderId: newLeader.id,
  });

  await goToStep({
    step: "memberSelect",
  });
};

// ------------------------
// 7. Quest Vote
// ------------------------
export const questVoteCanContinue = () => {
  const { activeQuest, players } = useSessionStore.getState();

  const playersOnQuestAreReady = activeQuest.players.every((playerId) => players[playerId].isReady);

  if (!playersOnQuestAreReady) return "Not all players on quest are ready";

  return true;
};

export const questVoteContinue = async () => {
  const { activeQuest, players, isMyPlayerHost, numFailQuests } = useSessionStore.getState();

  if (!isMyPlayerHost) return;

  let shouldProceed = true;

  activeQuest.players.map((playerId) => {
    if (activeQuest.votesToSucceed?.[playerId] === undefined) {
      shouldProceed = false;
    }

    if (!players[playerId].isReady) {
      shouldProceed = false;
    }
  });

  if (!shouldProceed) return;

  if (Object.values(activeQuest.votesToSucceed).some((vote) => vote === false)) {
    await updateSession({
      numFailQuests: Number(numFailQuests) + 1,
    });
  }

  await goToStep({
    step: "questResult",
  });
};

export const questVoteCanReady = (playerId: string) => {
  const { activeQuest } = useSessionStore.getState();

  if (!activeQuest.players.includes(playerId)) return "You are not part of this quest.";

  return true;
};

export const questVoteReady = async (playerId: string) => {
  await updatePlayer(playerId, {
    isReady: true,
  });
};

// ------------------------
// 8. Quest Result
// ------------------------
export const questResultCanContinue = () => {};

export const questResultContinue = async (hasPassed: boolean) => {
  const { isMyPlayerHost, playersArray, activeQuest, numFailMemberSelectVotes } = useSessionStore.getState();

  if (!isMyPlayerHost) return;

  const currentLeaderIndex = playersArray.findIndex((item) => item.id === activeQuest.leaderId);
  const newLeader = playersArray?.[currentLeaderIndex + 1] || playersArray[0];

  await updateSession({
    activeQuestIndex: activeQuest.index + 1,
  });

  await updateActiveQuest({
    leaderId: newLeader.id,
    players: [],
    votesToSucceed: {},
  });

  if (!hasPassed) {
    // await updateSession({
    //   numFailMemberSelectVotes: Number(numFailMemberSelectVotes) + 1,
    // });
  }

  await goToStep({
    step: "memberSelect",
  });
};

export const questResultCanReady = (playerId: string) => {
  const { activeQuest } = useSessionStore.getState();

  if (!activeQuest.players.includes(playerId)) return "You are not part of this quest.";

  return true;
};

export const questResultReady = async (playerId: string) => {
  await updatePlayer(playerId, {
    isReady: true,
  });
};
