export interface Props {
  canReady: true | string;
  onReady: () => void | Promise<void>;
  className?: string;
}
