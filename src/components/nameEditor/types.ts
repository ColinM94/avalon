export interface Props {
  lobbyId: string;
  playerId: string;
  nameDefault: string;
  show: boolean;
  setShow: (show: boolean) => void;
}
