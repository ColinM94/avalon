export interface Props {
  heading?: string;
  headingSubtitle?: string;
  value: boolean;
  setValue: (value: boolean) => void;
  className?: string;
}
