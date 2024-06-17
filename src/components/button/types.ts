import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface Props {
  label?: string;
  icon?: IconProp;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}
