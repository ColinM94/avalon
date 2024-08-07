export interface Props {
  value: string;
  setValue: (value: string) => void;
  type?: "text" | "number";
  onEnterClick?: () => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  inputClassName?: string;
  className?: string;
}
