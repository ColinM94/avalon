import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Splash, Toast } from "components";
import { getDocumentSnapshot, setDocument } from "services";
import { User } from "types";
import { useAppStore } from "stores";

export const Root = () => {
  const { user, updateAppStore } = useAppStore();

  const { pathname } = useLocation();

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

        updateAppStore({ user: value });
        return;
      },
    });

    return () => unsubscribe?.();
  }, [user.id]);

  React.useEffect(() => {
    // if (user.sessionId && !pathname.includes("/play/")) {
    //   navigate(`/play/${user.sessionId}`);
    // }
    // else if (!user.sessionId && pathname.includes("/play/")) {
    //   navigate("/");
    // }
  }, [user.sessionId, pathname]);

  return (
    <>
      <Splash />
      {user.id && <Outlet />}
      <Toast />
    </>
  );
};

/* 
  TODO: 
  - Persist the image
  - Add placeholder image with specific colours for when user doesn't want to add an image
  - Change to exit icon from X
  - no id on load of ritual page
  - players at bottom too small 
  - X and checkmark overlapping on player for host
  - Allow toggle ready and put checkmark on it
  - Remove ready button from vote pages 

  RitualPage
  - Have host press continue
  - Remove ready button
*/
