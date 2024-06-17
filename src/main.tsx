import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { LoadingOverlay, Splash, Toast } from "components";
import { getDocumentSnapshot, setDocument } from "services";
import { User } from "types";
import { useAppStore } from "stores";

export const Root = () => {
  const { user, updateUser } = useAppStore();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // User
  React.useEffect(() => {
    const unsubscribe = getDocumentSnapshot<User>({
      id: user.id,
      collection: "users",
      callback: (value) => {
        if (!value) {
          setDocument<{ id: string; name: string }>({
            id: user.id,
            collection: "users",
            data: user,
          });

          return;
        }

        updateUser(value);
        return;
      },
    });

    return () => unsubscribe?.();
  }, [user.id]);

  // Session
  // React.useEffect(() => {
  //   const unsubscribe = getDocumentsSnapshot<GameSession>({
  //     collection: "sessions",
  //     where: [[`players.${user.id}`, "!=", null]],
  //     callback: (sessions) => {
  //       updateSession(sessions?.[0] || null);
  //     },
  //   });

  //   return () => unsubscribe?.();
  // }, [user.id]);

  React.useEffect(() => {
    if (user.sessionId && !pathname.includes("/play/")) {
      navigate(`/play/${user.sessionId}`);
    } else if (!user.sessionId && pathname.includes("/play/")) {
      navigate("/");
    }
  }, [user.sessionId]);

  return (
    <>
      <Splash />
      {user.id && <Outlet />}
      <Toast />
    </>
  );
};
