export interface Props {
  showHeader?: boolean;
  showBackButton?: boolean;
  heading?: string;
  showCloseButton?: boolean;
  onCloseClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
