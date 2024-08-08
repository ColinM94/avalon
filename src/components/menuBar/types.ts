export interface Props {
  onClick?: () => void;
  onClickDisabled?: () => void;
  canContinue?: () => string | true;
  canReady?: () => string | true;
  onContinue?: () => void;
  onReady?: () => void;
  className?: string;
}
