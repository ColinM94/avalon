import * as React from "react"

import { Button } from "components/button/button"
import { Modal } from "components/modal/modal"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { updateSession } from "services/session/updateSession"
import { Player } from "types/gameSession"
import { updatePlayer } from "services/session/updatePlayer"
import { useToastStore } from "stores/useToastStore/useToastStore"
import { CharacterCard } from "components/characterCard/characterCard"
import { charactersDefault } from "consts/characters"
import { selectQuestMember } from "services/session/selectQuestMember"
import { goToStep } from "services/session/goToStep"
import { questMemberVote } from "services/session/questMemberVote"
import { classes } from "utils/classes"
import { questSucceedVote } from "services/session/questSucceedVote"
import { questMemberSelectCanContinue } from "services/session/canContinue"

import styles from "./styles.module.scss"

export const Debug = () => {
  const { session, activeQuest, isAllReady } = useSessionStore()
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

  console.log(session.step)

  return (
    <>
      <Button icon="sliders" onClick={() => setShowMenu(true)} className={styles.button} />

      <Modal show={showMenu} setShow={setShowMenu} className={styles.container}>
        <div className={styles.players}>
          {Object.values(session.players)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((player) => {
              const isSelectedForQuest = activeQuest.players.includes(player.id)
              const voteToSucceed = Boolean(activeQuest?.votesToSucceed?.[player.id])

              return (
                <div key={player.id} className={styles.player}>
                  <div className={styles.playerName}>{player.name}</div>

                  <div className={styles.playerContent}>
                    {player.characterId && (
                      <CharacterCard
                        character={charactersDefault[player.characterId]}
                        alwaysActive
                        className={styles.characterCard}
                      />
                    )}

                    <div className={styles.playerControls}>
                      {session.step === "questMemberSelect" && (
                        <Button
                          label={isSelectedForQuest ? "Remove" : "Add"}
                          // icon={isSelectedForQuest ? "minus" : "plus"}
                          disabled={isSelectedForQuest}
                          onClick={() => selectQuestMember(player.id)}
                          onClickDisabled={() => selectQuestMember(player.id)}
                          className={styles.button}
                        />
                      )}

                      {session.step === "questMemberVote" && (
                        <>
                          <Button
                            label="Yes"
                            onClick={() =>
                              questMemberVote({
                                playerId: player.id,
                                voteValue: true,
                              })
                            }
                            className={classes(
                              styles.yesButton,
                              activeQuest.votesToApprove[player.id] === true && styles.yesButtonActive,
                            )}
                          />

                          <Button
                            label="No"
                            onClick={() =>
                              questMemberVote({
                                playerId: player.id,
                                voteValue: false,
                              })
                            }
                            className={classes(
                              styles.noButton,
                              activeQuest.votesToApprove[player.id] === false && styles.noButtonActive,
                            )}
                          />
                        </>
                      )}

                      {session.step === "questVote" && activeQuest.players.includes(player.id) && (
                        <div className={styles.votes}>
                          <Button
                            label="Pass"
                            onClick={() =>
                              questSucceedVote({
                                playerId: player.id,
                                voteValue: true,
                              })
                            }
                            className={classes(
                              styles.yesButton,
                              activeQuest.votesToSucceed[player.id] === true && styles.yesButtonActive,
                            )}
                          />

                          <Button
                            label="Fail"
                            onClick={() =>
                              questSucceedVote({
                                playerId: player.id,
                                voteValue: false,
                              })
                            }
                            className={classes(
                              styles.noButton,
                              activeQuest.votesToSucceed[player.id] === false && styles.noButtonActive,
                            )}
                          />
                        </div>
                      )}

                      <Button
                        label={player.isReady ? "Unready" : "Ready"}
                        disabled={player.isReady}
                        onClick={() => {
                          void updatePlayer(player.id, {
                            isReady: !player.isReady,
                          })
                        }}
                        onClickDisabled={() => {
                          void updatePlayer(player.id, {
                            isReady: false,
                          })
                        }}
                        className={styles.button}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        <div className={styles.controls}>
          {session.step === "lobby" && (
            <Button
              label="Add Fake Player"
              onClick={addFakePlayer}
              onClickDisabled={() => showToast("Already at max players", "error")}
              disabled={Object.keys(session.players).length >= 10}
              className={styles.button}
            />
          )}

          <Button
            label={isAllReady ? "All Unready" : "All Ready"}
            onClick={() =>
              Object.keys(session.players).forEach((playerId) => {
                void updatePlayer(playerId, {
                  isReady: true,
                })
              })
            }
            disabled={isAllReady}
            onClickDisabled={() => {
              Object.keys(session.players).forEach((playerId) => {
                void updatePlayer(playerId, {
                  isReady: false,
                })
              })
            }}
            className={styles.button}
          />

          {session.step === "questMemberVote" && (
            <>
              <Button
                label="All Yes"
                onClick={() => {
                  Object.keys(session.players).forEach((playerId) => {
                    void questMemberVote({
                      playerId: playerId,
                      voteValue: true,
                    })
                  })
                }}
                className={styles.button}
              />

              <Button
                label="All No"
                onClick={() => {
                  Object.keys(session.players).forEach((playerId) => {
                    void questMemberVote({
                      playerId: playerId,
                      voteValue: false,
                    })
                  })
                }}
                className={styles.button}
              />
            </>
          )}

          {session.step === "questVote" && (
            <>
              <Button
                label="All Pass"
                onClick={() => {
                  activeQuest.players.forEach((playerId) => {
                    void questSucceedVote({
                      playerId: playerId,
                      voteValue: true,
                    })
                  })
                }}
                className={styles.button}
              />

              <Button
                label="All Fail"
                onClick={() => {
                  activeQuest.players.forEach((playerId) => {
                    void questSucceedVote({
                      playerId: playerId,
                      voteValue: false,
                    })
                  })
                }}
                className={styles.button}
              />
            </>
          )}

          {session.step === "questMemberSelect" && (
            <Button
              label="Continue"
              onClick={() => {
                void goToStep({
                  step: "questMemberVote",
                })
              }}
              disabled={Boolean(questMemberSelectCanContinue() !== true)}
              onClickDisabled={() => {
                showToast(String(questMemberSelectCanContinue()), "error")
              }}
              className={styles.button}
            />
          )}
        </div>
      </Modal>
    </>
  )
}
