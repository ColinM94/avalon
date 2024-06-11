export interface Props {
  sessionId: string;
  playerId: string;
  nameDefault: string;
  show: boolean;
  setShow: (show: boolean) => void;
}
