export interface Props {
  label: string;
  onClick: () => void;
  position: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
  className?: string;
}
