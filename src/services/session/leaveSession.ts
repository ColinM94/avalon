import { deleteField } from "firebase/firestore";

import { useAppStore, useToastStore } from "stores";
import { deleteDocument, updateDocument } from "services";

export const leaveSession = async () => {
  const { user, session } = useAppStore.getState();
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
