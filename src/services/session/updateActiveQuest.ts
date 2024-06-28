import { updateDocument } from "services";
import { useSessionStore } from "stores";
import { Quest } from "types";

export const updateActiveQuest = async (update: Partial<Quest>) => {
  const { session } = useSessionStore.getState();

  const success = await updateDocument<Quest>({
    collection: "sessions",
    id: session.id,
    data: {
      [`quests.${session.activeQuestIndex}`]: {
        ...session.quests[session.activeQuestIndex],
        ...update,
      },
    },
  });

  if (!success) throw `Unable to update quest ${session.activeQuestIndex}`;
};
