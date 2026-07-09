import * as React from "react";

import { Button } from "components/button/button";
import { Modal } from "components/modal/modal";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { updateSession } from "services/session/updateSession";
import { Player } from "types/gameSession";
import { updatePlayer } from "services/session/updatePlayer";
import { CharacterCard } from "components/characterCard/characterCard";
import { selectQuestMember } from "services/session/selectQuestMember";
import { goToStep } from "services/session/goToStep";
import { voteToApproveMember } from "services/session/voteToApproveMember";
import { classes } from "utils/classes";
import { questSucceedVote } from "services/session/questSucceedVote";
import { charactersDefault } from "consts/defaults";
import { useAppStore } from "stores/useAppStore/useAppStore";

import styles from "./styles.module.scss";
import { memberSelectCanContinue } from "services/session/logic";

export const Debug = () => {
  const { activeQuest, isAllReady, players, playersArray, sessionId, step, activeMemberSelectVotes, numPlayers } =
    useSessionStore();

  const { showToast } = useAppStore();
  const [showMenu, setShowMenu] = React.useState(false);

  const addFakePlayer = async () => {
    let fakePlayer: Player | undefined;

    for (let i = 1; i < 10; i++) {
      const fakePlayerId = `fakePlayer${i}`;

      if (!players[fakePlayerId]) {
        fakePlayer = {
          id: fakePlayerId,
          name: `Fake Player ${i}`,
          isMyPlayerHost: false,
          isReady: false,
          joinedAt: Date.now(),
          characterId: "servant1",
        };

        break;
      }
    }

    if (!fakePlayer) return;

    await updateSession(
      {
        [`players.${fakePlayer.id}`]: fakePlayer,
      },
      sessionId,
    );
  };

  return (
    <>
      <Button icon="sliders" onClick={() => setShowMenu(true)} className={styles.button} />

      <Modal show={showMenu} setShow={setShowMenu} className={styles.container}>
        <div className={styles.players}>
          {playersArray
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((player) => {
              const isSelectedForQuest = activeQuest.players.includes(player.id);

              return (
                <div key={player.id} className={styles.player}>
                  <div className={styles.playerName}>{player.name}</div>

                  <div className={styles.playerContent}>
                    {player.characterId && (
                      <CharacterCard
                        character={charactersDefault[player.characterId]}
                        className={styles.characterCard}
                      />
                    )}

                    <div className={styles.playerControls}>
                      {step === "memberSelect" && (
                        <Button
                          label={isSelectedForQuest ? "Remove" : "Add"}
                          disabled={isSelectedForQuest}
                          onClick={() => selectQuestMember(player.id)}
                          onClickDisabled={() => selectQuestMember(player.id)}
                          className={styles.button}
                        />
                      )}

                      {step === "memberSelectVote" && (
                        <>
                          <Button
                            label="Yes"
                            onClick={() =>
                              void voteToApproveMember({
                                playerId: player.id,
                                voteValue: true,
                              })
                            }
                            className={classes(
                              styles.yesButton,
                              activeMemberSelectVotes[player.id] === true && styles.yesButtonActive,
                            )}
                          />

                          <Button
                            label="No"
                            onClick={() =>
                              voteToApproveMember({
                                playerId: player.id,
                                voteValue: false,
                              })
                            }
                            className={classes(
                              styles.noButton,
                              activeMemberSelectVotes[player.id] === false && styles.noButtonActive,
                            )}
                          />
                        </>
                      )}

                      {step === "questVote" && activeQuest.players.includes(player.id) && (
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
                          });
                        }}
                        onClickDisabled={() => {
                          void updatePlayer(player.id, {
                            isReady: false,
                          });
                        }}
                        className={styles.button}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className={styles.controls}>
          {step === "lobby" && (
            <Button
              label="Add Fake Player"
              onClick={addFakePlayer}
              onClickDisabled={() => showToast("Already at max players", "error")}
              disabled={numPlayers >= 10}
              className={styles.button}
            />
          )}

          <Button
            label={isAllReady ? "All Unready" : "All Ready"}
            onClick={() =>
              playersArray.forEach((player) => {
                void updatePlayer(player.id, {
                  isReady: true,
                });
              })
            }
            disabled={isAllReady}
            onClickDisabled={() => {
              playersArray.forEach((player) => {
                void updatePlayer(player.id, {
                  isReady: false,
                });
              });
            }}
            className={styles.button}
          />

          {step === "memberSelectVote" && (
            <>
              <Button
                label="All Yes"
                onClick={() => {
                  playersArray.forEach((player) => {
                    void voteToApproveMember({
                      playerId: player.id,
                      voteValue: true,
                    });
                  });
                }}
                className={styles.button}
              />

              <Button
                label="All No"
                onClick={() => {
                  playersArray.forEach((player) => {
                    void voteToApproveMember({
                      playerId: player.id,
                      voteValue: false,
                    });
                  });
                }}
                className={styles.button}
              />
            </>
          )}

          {step === "questVote" && (
            <>
              <Button
                label="All Pass"
                onClick={() => {
                  activeQuest.players.forEach((playerId) => {
                    void questSucceedVote({
                      playerId: playerId,
                      voteValue: true,
                    });
                  });
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
                    });
                  });
                }}
                className={styles.button}
              />
            </>
          )}

          {step === "memberSelect" && (
            <Button
              label="Continue"
              onClick={() => {
                void goToStep({
                  step: "memberSelectVote",
                });
              }}
              disabled={Boolean(memberSelectCanContinue() !== true)}
              onClickDisabled={() => {
                showToast(String(memberSelectCanContinue()), "error");
              }}
              className={styles.button}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
