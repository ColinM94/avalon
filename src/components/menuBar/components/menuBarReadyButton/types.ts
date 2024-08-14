export interface Props {
  onClick?: () => void
  canContinue?: () => string | true
  canReady?: () => string | true
  onContinue?: () => void
  onReady?: () => void
  showContinue?: boolean
  className?: string
}
