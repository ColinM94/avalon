import { useAppStore, useToastStore } from "stores";
import { getDocument, updateDocument } from "services";
import { GameSession } from "types";
import { playerDefault } from "consts";
import { useNavigate } from "react-router-dom";

export const joinSession = async (sessionId: string) => {
  const { user } = useAppStore();
  const { showToast } = useToastStore.getState();

  try {
    const session = await getDocument<GameSession>({
      id: sessionId,
      collection: "sessions",
    });

    if (!session) throw `Game ${sessionId} not found!`;

    if (session.step !== "lobby") {
      throw "This game has already started!";
    }

    if (session?.step === "lobby") {
      await updateDocument({
        id: session.id,
        collection: "sessions",
        data: {
          [`players.${user.id}`]: {
            ...playerDefault(),
            id: user.id,
            name: user.name,
            joinedAt: Date.now(),
            isHost: false,
            characterId: "",
            isReady: false,
          },
        },
      });
    }
  } catch (error) {
    showToast(String(error));
  }
};
