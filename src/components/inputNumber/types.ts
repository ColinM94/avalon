export interface Props {
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}
