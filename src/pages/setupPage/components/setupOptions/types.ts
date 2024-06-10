import { Lobby } from "types";

export interface Props {
  lobby: Lobby;
  updateLobby: (update: Partial<Lobby>) => void;
  headingClassName?: string;
}
