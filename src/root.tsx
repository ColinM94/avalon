import React from "react";
import { Outlet } from "react-router-dom";

import { Splash } from "components";
import { generateUniqueId } from "utils";

export const Root = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  const playerId = localStorage.getItem("playerId");

  if (!playerId) {
    localStorage.setItem("playerId", generateUniqueId());
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    });

    return clearTimeout(timeout);
  }, []);

  return (
    <>
      {(showSplash || !playerId) && <Splash />}
      {(!showSplash || playerId) && <Outlet />}
    </>
  );
};
