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

export const charactersDefault: Characters = {
  // Good Characters
  merlin: {
    id: "merlin",
    name: "Merlin",
    isActive: true,
    allegiance: "good",
    isOptional: false,
    description: ["Knows who is evil", "If assassinated, evil wins.", "Is a cool wizard", "Can do a backflip"],
    howToPlay:
      "You know which players are evil, except Mordred if he is in the game. Use this information to guide the good team without revealing yourself too clearly. If the good team completes three successful quests, the Assassin may try to identify you; if they succeed, evil wins.",
    disabled: false,
  },
  percival: {
    id: "percival",
    name: "Percival",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: [
      "Knows who Merlin is",
      "Sees both Merlin and Morgana, but is not sure who is who.",
      "Makes Good more powerful.",
    ],
    howToPlay:
      "You see Merlin and Morgana, but you do not know which player is which. Use this information to help protect Merlin, while being careful not to make Merlin's identity obvious to evil.",
    disabled: false,
  },
  cleric: {
    id: "cleric",
    name: "Cleric",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: ["Knows if the leader of the first quest is good or evil.", "Makes Good more powerful.."],
    howToPlay:
      "At the start of the game, you learn whether the leader of the first quest is good or evil. Use this information to guide early discussion and help the good team make better decisions.",
    disabled: false,
  },
  troublemaker: {
    id: "troublemaker",
    name: "Troublemaker",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: [
      "Must lie when their loyaly is checked by the cleric or any rules/ability.",
      "Makes Evil more powerful.",
    ],
    howToPlay:
      "You are on the good team, but whenever your loyalty is checked by the Cleric or by any other rule or ability, you appear as evil. Because your role creates false information, play carefully and avoid letting your power mislead the good team too far.",
    disabled: false,
  },
  seniorMessenger: {
    id: "seniorMessenger",
    name: "Senior Messenger",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: [],
    howToPlay:
      "You receive information from your role at the start of the game. Use that information to support the good team, but do not share it so directly that evil can identify you.",
    disabled: true,
  },
  juniorMessenger: {
    id: "juniorMessenger",
    name: "Junior Messenger",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: [],
    howToPlay:
      "You receive limited information from your role at the start of the game. Use it to help the good team, but be cautious, since your knowledge may be incomplete.",
    disabled: true,
  },
  rogueGood: {
    id: "rogueGood",
    name: "Rogue",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: [],
    howToPlay:
      "You are on the good team. You have no revealed special power here, so your task is to read the table carefully, join successful quests, and help identify evil through discussion and voting.",
    disabled: false,
  },
  sorcererGood: {
    id: "sorcererGood",
    name: "Sorcerer",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: [],
    howToPlay:
      "You are on the good team and gain information or influence through your role's special ability. Use that advantage to support good while keeping your identity hidden from evil.",
    disabled: false,
  },
  lancelotGood: {
    id: "lancelotGood",
    name: "Lancelot",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: [],
    howToPlay:
      "You are on the good team. Even if your role causes suspicion, your goal is to help the good team succeed on quests and identify the evil players.",
    disabled: false,
  },
  untrustworthyServant: {
    id: "untrustworthyServant",
    name: "Untrustworthy Servant",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: [],
    howToPlay:
      "You are on the good team. Your role may make others doubt you, but you still win only if good wins, so focus on clear votes, solid reasoning, and successful quests.",
    disabled: false,
  },
  servant1: {
    id: "servant1",
    name: "Servant",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: ["Has no special powers"],
    howToPlay:
      "You have no special power. Your role is to help the good team by judging proposals carefully, watching how players act, and supporting the quests you believe will succeed.",
    disabled: false,
  },
  servant2: {
    id: "servant2",
    name: "Servant",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: ["Has no special powers"],
    howToPlay:
      "You have no special power. Your role is to help the good team by judging proposals carefully, watching how players act, and supporting the quests you believe will succeed.",
    disabled: false,
  },
  servant3: {
    id: "servant3",
    name: "Servant",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: ["Has no special powers"],
    howToPlay:
      "You have no special power. Your role is to help the good team by judging proposals carefully, watching how players act, and supporting the quests you believe will succeed.",
    disabled: false,
  },
  servant4: {
    id: "servant4",
    name: "Servant",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: ["Has no special powers"],
    howToPlay:
      "You have no special power. Your role is to help the good team by judging proposals carefully, watching how players act, and supporting the quests you believe will succeed.",
    disabled: false,
  },
  servant5: {
    id: "servant5",
    name: "Servant",
    isActive: false,
    allegiance: "good",
    isOptional: true,
    description: ["Has no special powers"],
    howToPlay:
      "You have no special power. Your role is to help the good team by judging proposals carefully, watching how players act, and supporting the quests you believe will succeed.",
    disabled: false,
  },

  // Evil Characters
  assassin: {
    id: "assassin",
    name: "Assassin",
    isActive: true,
    allegiance: "evil",
    isOptional: false,
    description: ["Can assasinate who they think is Merlin, at the end of the game."],
    howToPlay:
      "You are evil. At the end of the game, if the good team has completed three successful quests, you may choose one player to assassinate. If that player is Merlin, evil wins.",
    disabled: false,
  },
  morgana: {
    id: "morgana",
    name: "Morgana",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: ["Disguises herself as Merlin", "Percival sees both Merlin and Morgana with their thumbs up."],
    howToPlay:
      "You are evil. At the start of the game, Percival sees you as a possible Merlin, just as they see the real Merlin. Use this to confuse Percival and weaken the good team's ability to protect Merlin.",
    disabled: false,
  },
  oberon: {
    id: "oberon",
    name: "Oberon",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: ["Does not reveal himself to other evil players.", "Makes Good more powerful."],
    howToPlay:
      "You are evil, but you do not know the other evil players, and they do not know you. Work against the good team without revealing yourself, even though you cannot openly coordinate with evil.",
    disabled: false,
  },
  mordred: {
    id: "mordred",
    name: "Mordred",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: ["Makes evil more powerful."],
    howToPlay:
      "You are evil, and Merlin does not see you at the start of the game. Use this hidden status to appear trustworthy, avoid suspicion, and help the evil team from the shadows.",
    disabled: false,
  },
  lunatic: {
    id: "lunatic",
    name: "Lunatic",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: ["Must fail every quest they are on.", "Recommended for games with 7+ players."],
    howToPlay:
      "You are evil. Whenever you are on a quest, you must play a Fail card. Because your role is highly disruptive and easier to detect in small games, it is recommended for games with 7 or more players.",
    disabled: false,
  },
  sorcererEvil: {
    id: "sorcererEvil",
    name: "Sorcerer",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: [],
    howToPlay:
      "You are evil and use your role's special ability to mislead the good team. Support evil by creating doubt, shaping discussion, and protecting the identities of your allies.",
    disabled: false,
  },
  revealer: {
    id: "revealer",
    name: "Revealer",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: [],
    howToPlay:
      "You are evil and can use your role's information to influence the table at key moments. Reveal only what helps your team most, and keep the good team uncertain.",
    disabled: true,
  },
  rogueEvil: {
    id: "rogueEvil",
    name: "Rogue",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: [],
    howToPlay:
      "You are evil. Your strength is in appearing harmless, so blend in with the good team, avoid drawing attention, and help sabotage their plans.",
    disabled: true,
  },
  trickster: {
    id: "trickster",
    name: "Trickster",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: ["Makes Evil more powerful."],
    howToPlay:
      "You are evil. Use lies, half-truths, and confusion to make the good team doubt each other. Your role is strongest when the table cannot agree on what is true.",
    disabled: true,
  },
  brute: {
    id: "brute",
    name: "Brute",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: [
      "Makes good more powerful.",
      "May fail first three quests.",
      "Only allowed to fail the first 3 quests.",
    ],
    howToPlay:
      "You are evil. You may only play Fail on the first three quests of the game. After that, you cannot directly sabotage quests, so use your power early and rely on deception later.",
    disabled: true,
  },
  lancelotEvil: {
    id: "lancelotEvil",
    name: "Lancelot",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: [],
    howToPlay:
      "You are evil, though other players may not expect it. Use that false trust to stay hidden, join quests when useful, and undermine the good team from within.",
    disabled: true,
  },
  minion1: {
    id: "minion1",
    name: "Minion",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: ["Has no special powers"],
    howToPlay:
      "You have no special power beyond being evil. Work with your teammates to sabotage quests, mislead the good players, and protect the more important evil roles.",
    disabled: false,
  },
  minion2: {
    id: "minion2",
    name: "Minion",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: ["Has no special powers"],
    howToPlay:
      "You have no special power beyond being evil. Work with your teammates to sabotage quests, mislead the good players, and protect the more important evil roles.",
    disabled: false,
  },
  minion3: {
    id: "minion3",
    name: "Minion",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
    description: ["Has no special powers"],
    howToPlay:
      "You have no special power beyond being evil. Work with your teammates to sabotage quests, mislead the good players, and protect the more important evil roles.",
    disabled: false,
  },
};
