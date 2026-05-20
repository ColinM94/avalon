import * as React from "react"
import { useLocation } from "wouter"

import styles from "./styles.module.scss"

export const InvalidPage = () => {
  const [, navigate] = useLocation()

  React.useEffect(() => {
    navigate("/")
  }, [])

  return (
    <div className={styles.container}>
      <h1>Page Not Found {":("}</h1>
    </div>
  )
}
