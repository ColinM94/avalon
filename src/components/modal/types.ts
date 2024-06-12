export interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  children: React.ReactNode;
  className?: string;
}
