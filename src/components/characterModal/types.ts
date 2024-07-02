export interface Props {
  characterId: string;
  show: boolean;
  setShow: (show: boolean) => void;
  headingTitle?: string;
  headingSubtitle?: string;
  className?: string;
}
