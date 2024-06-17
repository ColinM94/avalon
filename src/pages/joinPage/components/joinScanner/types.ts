export interface Props {
  showScanner: boolean;
  setShowScanner: (show: boolean) => void;
  onScanSuccess: (code: string) => void;
  className?: string;
}
