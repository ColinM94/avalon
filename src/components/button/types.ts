import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface Props {
  label?: string;
  icon?: IconProp;
  onClick: () => void;
  onClickDisabled?: () => void;
  disabled?: boolean;
  iconClassName?: string;
  className?: string;
}
