import { updateDocument } from "services/firestore/updateDocument";
import { useToastStore } from "stores";
import { GameSession, Player, User } from "types";

export const updatePlayer = async (
  userId: string,
  session: GameSession,
  update: Partial<Player>
) => {
  const { showToast } = useToastStore.getState();

  try {
    await updateDocument<GameSession>({
      id: session.id,
      collection: "sessions",
      data: {
        [`players.${userId}`]: {
          ...session.players[userId],
          ...update,
        },
      },
    });

    if (update.name) {
      await updateDocument<User>({
        id: userId,
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
