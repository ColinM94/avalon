export interface Props {
  onClick?: () => void;
  canContinue?: () => string | true;
  canReady?: () => string | true;
  onContinue?: () => Promise<void>;
  onReady?: () => Promise<void>;
  hideReadyButton: boolean | undefined;
  className?: string;
}
