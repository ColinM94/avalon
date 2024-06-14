import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Splash, Toast } from "components";
import {
  getDocumentSnapshot,
  getDocumentsSnapshot,
  setDocument,
} from "services";
import { GameSession, User } from "types";
import { useAppStore } from "stores";

export const Root = () => {
  const { user, session, updateUser, updateSession } = useAppStore();

  console.log(session);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // User
  React.useEffect(() => {
    const unsubscribe = getDocumentSnapshot<User>({
      id: user.id,
      collection: "users",
      callback: (value) => {
        if (value) {
          updateUser(value);
          return;
        }

        setDocument<{ id: string; name: string }>({
          id: user.id,
          collection: "users",
          data: user,
        });
      },
    });

    return () => unsubscribe?.();
  }, [user.id]);

  // Session
  React.useEffect(() => {
    const unsubscribe = getDocumentsSnapshot<GameSession>({
      collection: "sessions",
      where: [[`players.${user.id}`, "!=", null]],
      callback: (sessions) => {
        updateSession(sessions?.[0] || null);
      },
    });

    return () => unsubscribe?.();
  }, [user.id]);

  React.useEffect(() => {
    if (session?.id && pathname !== "/play") {
      navigate("/play");
      return;
    }

    if (!session?.id && pathname === "/play") {
      navigate("/");
    }
  }, [session?.id]);

  return (
    <>
      <Splash />
      {user.id && <Outlet />}
      <Toast />
    </>
  );
};
