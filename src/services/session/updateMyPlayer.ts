import { updateDocument } from "services/firestore/updateDocument";
import { useAppStore, useToastStore } from "stores";
import { GameSession, Player, User } from "types";

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

    if (update.name) {
      await updateDocument<User>({
        id: user.id,
        collection: "users",
        data: {
          name: update.name,
        },
      });
    }
  } catch (error) {
    showToast(String(error));
  }
};
