export interface Props {
  onClick?: () => void
  onClickDisabled?: () => void
  canContinue?: () => string | true
  canReady?: () => string | true
  onContinue?: () => Promise<void>
  onReady?: () => Promise<void>
  showContinue: boolean
  className?: string
}
