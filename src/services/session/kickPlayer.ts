import { useAppStore, useToastStore } from "stores";
import { updateDocument } from "services";
import { deleteField } from "firebase/firestore";

export const kickPlayer = async (userId: string) => {
  const { session } = useAppStore.getState();
  const { showToast } = useToastStore.getState();

  try {
    if (session?.step === "lobby") {
      await updateDocument({
        id: session.id,
        collection: "sessions",
        data: {
          [`players.${userId}`]: deleteField(),
        },
      });
    }
  } catch (error) {
    showToast(String(error), "error");
  }
};
