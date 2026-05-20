import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { classes } from "utils/classes"
import { Heading } from "components/heading/heading"

import styles from "./styles.module.scss"
import { Props } from "./types"

export const InputCheckbox = (props: Props) => {
  const { value, setValue, heading, headingSubtitle, className } = props

  const handleClick = () => {
    setValue(!value)
  }

  return (
    <div onClick={handleClick} className={classes(styles.container, className)}>
      {heading && <Heading headingTitle={heading} headingSubtitle={headingSubtitle} />}

      <div className={styles.iconContainer}>{value && <FontAwesomeIcon icon="check" className={styles.icon} />}</div>
    </div>
  )
}
