import * as React from "react"
import { useLocation, useParams } from "wouter"

import { LoadingOverlay } from "components/loadingOverlay/loadingOverlay"
import { MainLayout } from "layouts/mainLayout/mainLayout"
import { Button } from "components/button/button"
import { Divider } from "components/divider/divider"
import { InputText } from "components/inputText/inputText"

import { JoinScanner } from "./components/joinScanner/joinScanner"
import styles from "./styles.module.scss"

export const JoinPage = () => {
  const { sessionId } = useParams()
  const [, navigate] = useLocation()

  const [code, setCode] = React.useState("")
  const [showScanner, setShowScanner] = React.useState(false)

  // React.useEffect(() => {
  //   if (sessionId) handleJoin(sessionId)
  // }, [sessionId])

  const handleJoin = (code: string) => {
    if (!code) return

    navigate(`/play/${code}`)
  }

  const openCamera = () => {
    setShowScanner(true)
  }

  if (sessionId) return <LoadingOverlay />

  return (
    <MainLayout showHeader showBackButton heading="Join Game" className={styles.container}>
      <div className={styles.section}>
        <div className={styles.instruction}>Scan QR Code</div>

        <JoinScanner
          showScanner={showScanner}
          setShowScanner={setShowScanner}
          onScanSuccess={(value) => handleJoin(value)}
          className={styles.scanner}
        />

        <Button label="Scan" onClick={openCamera} />
      </div>

      <Divider label="or" className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.instruction}>Enter the Game Code</div>

        <InputText
          type="number"
          value={code}
          setValue={setCode}
          placeholder="Code"
          onEnterClick={() => handleJoin(code)}
        />

        <Button label="Join" onClick={() => handleJoin(code)} />
      </div>
    </MainLayout>
  )
}
