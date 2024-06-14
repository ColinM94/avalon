export interface Props {
  value: string;
  setValue: (value: string) => void;
  type: "text" | "number";
  placeholder?: string;
  inputClassName?: string;
  className?: string;
}
