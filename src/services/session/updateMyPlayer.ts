import { updateDocument } from "services/firestore/updateDocument";
import { useAppStore, useToastStore } from "stores";
import { GameSession, Player } from "types";

export const updateMyPlayer = async (update: Partial<Player>) => {
  const { session, user } = useAppStore.getState();
  const { showToast } = useToastStore.getState();

  try {
    await updateDocument<GameSession>({
      id: session.id,
      collection: "sessions",
      data: {
        [`players.${user.id}`]: {
          ...session.players[user.id],
          ...update,
        },
      },
    });
  } catch (error) {
    showToast(String(error));
  }
};
