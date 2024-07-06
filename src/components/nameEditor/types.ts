export interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  onSaveSuccess?: () => void;
}
