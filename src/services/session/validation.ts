import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { Player } from "types/gameSession";
import { Characters } from "types/characters";
import { shuffleArray } from "utils/shuffleArray";
import { maxCharacters } from "consts/characters";
import { numPlayersByQuest } from "consts/general";

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
  const { playersArray, session } = useSessionStore.getState();

  const playerUpdates: Record<string, Partial<Player>> = {};

  playersArray.forEach((player, index) => {
    playerUpdates[player.id] = {
      characterId: session.characters[index] || "",
    };
  });

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
  const { session, playersArray, activeQuest } = useSessionStore.getState();

  await updateActiveQuest({
    numPlayers: numPlayersByQuest[activeQuest.index][session.numPlayers - 5],
    leaderId: playersArray[0].id,
  });

  await goToStep({
    step: "questMemberSelect",
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
// 4. Quest Member Select
// ------------------------
export const questMemberSelectCanContinue = () => {
  const { activeQuest } = useSessionStore.getState();

  if (activeQuest.numPlayers !== activeQuest.players.length) {
    return `Please select ${activeQuest.numPlayers} players.`;
  }

  return lobbyCanReady();
};

export const questMemberSelectContinue = async () => {
  await goToStep({
    step: "questMemberVote",
  });
};

// ------------------------
// 5. Quest Member Vote
// ------------------------
export const questMemberVoteCanContinue = () => {
  const { isAllReady } = useSessionStore.getState();

  if (!isAllReady) return "All players are not ready";

  return true;
};

export const questMemberVoteContinue = async () => {
  const { activeQuest, session } = useSessionStore.getState();

  const votes = Object.values(activeQuest.votesToApprove).sort((a, b) => Number(b) - Number(a));
  const hasPassed = Boolean(votes.filter((vote) => vote).length > votes.length / 2);

  if (!hasPassed) {
    await updateSession({
      numFailVotes: session.numFailVotes + 1,
    });
  }

  await goToStep({
    step: "questMemberResult",
  });
};

// ------------------------
// 5. Quest Member Result
// ------------------------
export const questMemberResultContinue = async (hasPassed: boolean) => {
  const { activeQuest, session, playersArray } = useSessionStore.getState();

  if (session.numFailVotes >= 5) {
    await goToStep({
      step: "gameOver",
    });

    return;
  }

  if (hasPassed) {
    await goToStep({
      step: "questVote",
    });

    return;
  }

  const currentLeaderIndex = playersArray.findIndex((item) => item.id === activeQuest.leaderId);
  const newLeader = playersArray?.[currentLeaderIndex + 1] || playersArray[0];

  await updateActiveQuest({
    leaderId: newLeader.id,
    players: [],
    votesToApprove: {},
    votesToSucceed: {},
  });

  await goToStep({
    step: "questMemberSelect",
  });
};

// ------------------------
// 5. Quest Vote
// ------------------------
export const questVoteCanContinue = () => {
  const { activeQuest, players } = useSessionStore.getState();

  const playersOnQuestAreReady = activeQuest.players.every((playerId) => players[playerId].isReady);

  if (!playersOnQuestAreReady) return "Not all players on quest are ready";

  return true;
};

export const questVoteContinue = async () => {
  const { activeQuest, players, isMyPlayerHost, session } = useSessionStore.getState();

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
      numFailQuests: Number(session.numFailQuests) + 1,
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
// 6. Quest Result
// ------------------------
export const questResultCanContinue = () => {};

export const questResultContinue = async (hasPassed: boolean) => {
  const { isMyPlayerHost, playersArray, activeQuest, session } = useSessionStore.getState();

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
    await updateSession({
      numFailVotes: Number(session.numFailVotes) + 1,
    });
  }

  await goToStep({
    step: "questMemberSelect",
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
