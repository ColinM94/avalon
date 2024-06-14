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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, session, updateUser, updateSession } = useAppStore();

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

  // React.useEffect(() => {
  //   // if(!session &&) {
  //   //   navigate()
  //   // }

  //   if (
  //     !session &&
  //     pathname !== "/" &&
  //     pathname !== "/characters" &&
  //     pathname !== "/join" &&
  //     pathname !== "/setup"
  //   ) {
  //     navigate("/");
  //     return;
  //   }

  //   if (!session) {
  //     return;
  //   }

  //   const step = session.step;

  //   if (step === "lobby" && !pathname.includes("/lobby")) {
  //     navigate(`/lobby/${session.id}`);
  //     return;
  //   }

  //   console.log(step);

  //   if (step === "characterReveal" && !pathname.includes("/characterReveal")) {
  //     navigate(`/characterReveal`);
  //     return;
  //   }

  //   if (step === "ritual" && !pathname.includes("/ritual")) {
  //     navigate("/ritual");
  //     return;
  //   }

  //   if (step === "quests" && !pathname.includes("/quests")) {
  //     navigate("/quests");
  //     return;
  //   }
  // }, [session, pathname]);

  // React.useEffect(() => {
  //   if (session.createdBy === player.id) {
  //     updateDocument({
  //       id: session.id,
  //       collection: "sessions",
  //       data: session,
  //     });
  //   }
  // }, [player.id, session]);

  return (
    <>
      <Splash />
      {user.id && <Outlet />}
      <Toast />
    </>
  );
};
