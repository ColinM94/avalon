import * as React from "react";
import { useLocation, useParams } from "wouter";

import { LoadingOverlay } from "components/loadingOverlay/loadingOverlay";
import { useAppStore } from "stores/useAppStore/useAppStore";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { joinSession } from "services/session/joinSession";

import { PlayProtected } from "./playProtected/playProtected";

export const PlayPage = () => {
  const [, navigate] = useLocation();

  const { user } = useAppStore();
  const params = useParams();
  const { showToast } = useAppStore();
  const { sessionId, resetSessionsStore } = useSessionStore();

  const handleJoinSession = async () => {
    try {
      if (!params.sessionId) throw new Error("Session ID not defined");

      const response = await joinSession({
        sessionId: params.sessionId,
        user,
      });

      if (!response.ok) throw new Error(response.message);

      useSessionStore.setState({
        sessionId: params.sessionId,
      });
    } catch (error) {
      const err = error as Error;

      useSessionStore.setState({
        sessionId: undefined,
      });
      resetSessionsStore();
      showToast(err.message, "error");
      navigate("/");
    }
  };

  React.useEffect(() => {
    void handleJoinSession();
  }, [params.sessionId]);

  if (!sessionId || params.sessionId !== sessionId) return <LoadingOverlay />;

  return <PlayProtected />;
};
