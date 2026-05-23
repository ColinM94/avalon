import * as React from "react"

import { Button } from "components/button/button"
import { Modal } from "components/modal/modal"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { updateSession } from "services/session/updateSession"
import { Player } from "types/gameSession"
import { updatePlayer } from "services/session/updatePlayer"
import { useToastStore } from "stores/useToastStore/useToastStore"

import styles from "./styles.module.scss"

export const Debug = () => {
  const { session } = useSessionStore()
  const { showToast } = useToastStore()
  const [showMenu, setShowMenu] = React.useState(false)

  const addFakePlayer = async () => {
    let fakePlayer: Player | undefined

    for (let i = 1; i < 10; i++) {
      const fakePlayerId = `fakePlayer${i}`

      if (!session.players[fakePlayerId]) {
        fakePlayer = {
          id: fakePlayerId,
          name: `Fake Player ${i}`,
          isMyPlayerHost: false,
          isReady: false,
          joinedAt: Date.now(),
          characterId: "",
        }

        console.log("break")
        break
      }
    }

    if (!fakePlayer) return

    await updateSession(
      {
        [`players.${fakePlayer.id}`]: fakePlayer,
      },
      session.id,
    )
  }

  return (
    <>
      <Button icon="sliders" onClick={() => setShowMenu(true)} className={styles.button} />

      <Modal show={showMenu} setShow={setShowMenu} className={styles.container}>
        <Button
          label="Add Fake Player"
          onClick={addFakePlayer}
          onClickDisabled={() => showToast("Already at max players", "error")}
          disabled={Object.keys(session.players).length >= 10}
        />

        <div className={styles.players}>
          {Object.values(session.players)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((player) => (
              <div key={player.id} className={styles.player}>
                <div className={styles.playerName}>{player.name}</div>
                <Button
                  disabled={player.isReady}
                  label="Ready"
                  onClick={() => {
                    void updatePlayer(player.id, {
                      isReady: true,
                    })
                  }}
                  onClickDisabled={() => showToast(`${player.name} is already ready`, "error")}
                />
              </div>
            ))}
        </div>
      </Modal>
    </>
  )
}
