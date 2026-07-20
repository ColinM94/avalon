import { Characters } from "types/characters";
import { GameSession, Player } from "types/gameSession";
import { User } from "types/user";
import { generateUniqueId } from "utils/generateUniqueId";

const memberSelectVotesDefault = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {} };

export const userDefault = (): User => {
  return {
    id: generateUniqueId(),
    name: "",
    sessionId: null,
    imageUrl: "",
  };
};

export const playerDefault = (): Player => {
  return {
    id: "",
    name: "",
    characterId: "servant1",
    isMyPlayerHost: false,
    joinedAt: 0,
    isReady: false,
  };
};

export const sessionDefault = (): GameSession => {
  return {
    id: "",
    name: "",
    players: {},
    numPlayers: 5,
    createdBy: "",
    step: "lobby",
    characters: [],
    isMyPlayerHostPlaying: true,
    // numFailVotes: 0,
    numFailQuests: 0,
    isRitualFinished: false,
    activeQuestIndex: 0,
    activeMemberSelectVoteIndex: 0,
    numFailMemberSelectVotes: 0,
    quests: {
      0: {
        index: 0,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        memberSelectVotes: memberSelectVotesDefault,
        votesToSucceed: {},
        isApproved: false,
        isSuccessful: false,
        isFailed: false,
      },
      1: {
        index: 1,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        memberSelectVotes: memberSelectVotesDefault,
        votesToSucceed: {},
        isApproved: false,
        isSuccessful: false,
        isFailed: false,
      },
      2: {
        index: 2,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        memberSelectVotes: memberSelectVotesDefault,
        votesToSucceed: {},
        isApproved: false,
        isSuccessful: false,
        isFailed: false,
      },
      3: {
        index: 3,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        memberSelectVotes: memberSelectVotesDefault,
        votesToSucceed: {},
        isApproved: false,
        isSuccessful: false,
        isFailed: false,
      },
      4: {
        index: 4,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        memberSelectVotes: memberSelectVotesDefault,
        votesToSucceed: {},
        isApproved: false,
        isSuccessful: false,
        isFailed: false,
      },
    },
  };
};
