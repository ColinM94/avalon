import { Characters } from "types";

export const charactersDefault: Characters = {
  // Good Characters
  merlin: {
    id: "merlin",
    isActive: true,
    allegiance: "good",
    isOptional: false,
  },
  percival: {
    id: "percival",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  juniorMessenger: {
    id: "juniorMessenger",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  troublemaker: {
    id: "troublemaker",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  cleric: {
    id: "cleric",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  seniorMessenger: {
    id: "seniorMessenger",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  rogueGood: {
    id: "rogueGood",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  sorcererGood: {
    id: "sorcererGood",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  lancelotGood: {
    id: "lancelotGood",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  untrustworthyServant: {
    id: "untrustworthyServant",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  servant1: {
    id: "servant1",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  servant2: {
    id: "servant2",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  servant3: {
    id: "servant3",
    isActive: false,
    allegiance: "good",
    isOptional: true,
  },
  assassin: {
    id: "assassin",
    isActive: true,
    allegiance: "evil",
    isOptional: false,
  },
  morgana: {
    id: "morgana",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  oberon: {
    id: "oberon",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  mordred: {
    id: "mordred",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  lunatic: {
    id: "lunatic",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  sorcererEvil: {
    id: "sorcererEvil",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  revealer: {
    id: "revealer",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  rogueEvil: {
    id: "rogueEvil",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  trickster: {
    id: "trickster",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  brute: {
    id: "brute",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  lancelotEvil: {
    id: "lancelotEvil",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  minion1: {
    id: "minion1",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  minion2: {
    id: "minion2",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
  minion3: {
    id: "minion3",
    isActive: false,
    allegiance: "evil",
    isOptional: true,
  },
};

export const maxCharacters: Record<number, { good: number; evil: number }> = {
  5: {
    good: 3,
    evil: 2,
  },
  6: {
    good: 4,
    evil: 2,
  },
  7: {
    good: 4,
    evil: 3,
  },
  8: {
    good: 5,
    evil: 3,
  },
  9: {
    good: 6,
    evil: 3,
  },
  10: {
    good: 6,
    evil: 4,
  },
};

export const characterNames: Record<string, string> = {
  merlin: "Merlin",
  percival: "Percival",
  juniorMessenger: "Junior Messenger",
  troublemaker: "Troublemaker",
  cleric: "Cleric",
  seniorMessenger: "Senior Messenger",
  rogueGood: "Good Rogue",
  sorcererGood: "Good Sorcerer",
  lancelotGood: "Good Lancelot",
  untrustworthyServant: "Untrustworthy Servant",
  servant1: "Servant 1",
  servant2: "Servant 2",
  servant3: "Servant 3",
  morgana: "Morgana",
  oberon: "Oberon",
  mordred: "Mordred",
  lunatic: "Lunatic",
  sorcererEvil: "Evil Sorcerer",
  revealer: "Revealer",
  rogueEvil: "Evil Rogue",
  trickster: "Trickster",
  brute: "Brute",
  lancelotEvil: "Evil Lancelot",
  assassin: "Assassin",
  minion1: "Minion 1",
  minion2: "Minion 2",
  minion3: "Minion 3",
};
