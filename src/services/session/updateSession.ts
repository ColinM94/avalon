import { updateDocument } from "services";
import { useToastStore } from "stores";
import { GameSession } from "types";

export const updateSession = async (
  sessionId: string,
  update: Partial<GameSession>
) => {
  const { showToast } = useToastStore.getState();

  try {
    await updateDocument<GameSession>({
      id: sessionId,
      collection: "sessions",
      data: update,
    });
  } catch (error) {
    showToast(String(error));
  }
};
