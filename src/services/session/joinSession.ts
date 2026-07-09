import { getDocument } from "services/firestore/getDocument";
import { GameSession } from "types/gameSession";
import { User } from "types/user";
import { updateDocument } from "services/firestore/updateDocument";
import { APIResponse } from "consts/general";
import { playerDefault } from "consts/defaults";

import { updateSession } from "./updateSession";

interface Props {
  sessionId: string;
  user: User;
}

export const joinSession = async ({ sessionId, user }: Props): APIResponse<void> => {
  try {
    const tempSession = await getDocument<GameSession>({
      id: sessionId,
      collection: "sessions",
    });

    if (!tempSession) throw new Error("Session not found!");

    if (!tempSession?.players[user.id] && Object.keys(tempSession.players).length >= tempSession.numPlayers) {
      throw new Error("Lobby is full");
    }

    if (!tempSession.players[user.id]) {
      const defaultName = `Player ${tempSession.numPlayers + 1}`;

      const joinedSession = await updateSession(
        {
          [`players.${user.id}`]: {
            ...playerDefault(),
            id: user.id,
            name: user.name || defaultName,
            imageUrl: user.imageUrl || "",
            joinedAt: Date.now(),
          },
        },
        sessionId,
      );

      if (!joinedSession) throw new Error("Error joining session");

      await updateDocument<User>({
        collection: "users",
        id: user.id,
        data: {
          sessionId,
        },
      });
    }

    return {
      ok: true,
      data: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message,
    };
  }
};
