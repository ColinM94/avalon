import { deleteField } from "firebase/firestore";

import { useAppStore, useToastStore } from "stores";
import { deleteDocument, updateDocument } from "services";
import { GameSession } from "types";

export const leaveSession = async (session: GameSession) => {
  const { user } = useAppStore.getState();
  const { showToast } = useToastStore.getState();

  try {
    if (session.createdBy === user.id || session.step !== "lobby") {
      await deleteDocument({
        id: session.id,
        collection: "sessions",
      });

      return;
    }

    await updateDocument({
      id: session.id,
      collection: "sessions",
      data: {
        [`players.${user.id}`]: deleteField(),
      },
    });
  } catch (error) {
    showToast(String(error));
  }
};
