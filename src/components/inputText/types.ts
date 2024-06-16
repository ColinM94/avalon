export interface Props {
  value: string;
  setValue: (value: string) => void;
  type: "text" | "number";
  onEnterClick?: () => void;
  placeholder?: string;
  inputClassName?: string;
  className?: string;
}
