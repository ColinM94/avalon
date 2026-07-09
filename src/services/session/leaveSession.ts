import { navigate } from "wouter/use-browser-location";

import { deleteField } from "firebase/firestore";
import { deleteDocument } from "services/firestore/deleteDocument";
import { updateDocument } from "services/firestore/updateDocument";
import { User } from "types/user";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { useAppStore } from "stores/useAppStore/useAppStore";

import { updateSession } from "./updateSession";

export const leaveSession = async () => {
  const { showToast } = useAppStore.getState();
  const { myPlayer, step, isMyPlayerHost, sessionId, resetSessionsStore } = useSessionStore.getState();

  try {
    const confirmed = confirm("Are you sure you want to leave? This will end the game for everyone!");

    if (!confirmed) return;

    const promises = [
      updateDocument<User>({
        id: myPlayer.id,
        collection: "users",
        data: {
          sessionId: null,
        },
      }),
    ];

    if (step === "lobby") {
      promises.push(
        updateSession({
          [`players.${myPlayer.id}`]: deleteField(),
        }),
      );
    }

    if (isMyPlayerHost || step !== "lobby") {
      promises.push(
        deleteDocument({
          id: sessionId,
          collection: "sessions",
        }),
      );
    }

    resetSessionsStore();

    navigate("/");

    await Promise.all(promises);
  } catch (error) {
    const err = error as Error;
    showToast(err.message);
  }
};
