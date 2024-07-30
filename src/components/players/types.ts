export interface Props {
  showDivider?: boolean;
  showMyPlayer?: boolean;
  showEmptySlots?: boolean;
  showOnlyPlayersOnActiveQuest?: boolean;
  showIsReady?: boolean;
  playerIds?: string[];
  width?: 1 | 2 | 3;
  className?: string;
}
