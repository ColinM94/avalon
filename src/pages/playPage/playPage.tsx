import * as React from "react"
import { useLocation, useParams } from "wouter"

import { LoadingOverlay } from "components/loadingOverlay/loadingOverlay"
import { playerDefault } from "consts/playerDefault"
import { getDocument } from "services/firestore/getDocument"
import { updateDocument } from "services/firestore/updateDocument"
import { updateSession } from "services/session/updateSession"
import { useAppStore } from "stores/useAppStore/useAppStore"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { useToastStore } from "stores/useToastStore/useToastStore"
import { GameSession } from "types/gameSession"
import { User } from "types/user"

import { PlayProtected } from "./playProtected/playProtected"

export const PlayPage = () => {
  const [, navigate] = useLocation()

  const { user } = useAppStore()
  const params = useParams()
  const { showToast } = useToastStore()
  const { resetSessionsStore } = useSessionStore()

  const [sessionId, setSessionId] = React.useState<string | undefined>()

  const joinSession = async () => {
    try {
      if (!params.sessionId) throw new Error("Session ID not defined")

      const tempSession = await getDocument<GameSession>({
        id: params.sessionId,
        collection: "sessions",
      })

      if (!tempSession) throw new Error("Session not found!")

      if (!tempSession?.players[user.id] && Object.keys(tempSession.players).length >= tempSession.numPlayers) {
        throw new Error("Lobby is full")
      }

      if (!tempSession.players[user.id]) {
        const joinedSession = await updateSession(
          {
            [`players.${user.id}`]: {
              ...playerDefault(),
              id: user.id,
              name: user.name,
              imageUrl: user.imageUrl || "",
              joinedAt: Date.now(),
            },
          },
          params.sessionId,
        )

        if (!joinedSession) throw new Error("Error joining session")
      }

      await updateDocument<User>({
        collection: "users",
        id: user.id,
        data: {
          sessionId: params.sessionId,
        },
      })

      setSessionId(tempSession.id)
    } catch (error) {
      setSessionId(undefined)
      resetSessionsStore()
      showToast(String(error), "error")
      navigate("/")
    }
  }

  React.useEffect(() => {
    void joinSession()
  }, [params.sessionId])

  if (!sessionId) return <LoadingOverlay />

  return <PlayProtected sessionId={sessionId} />
}
