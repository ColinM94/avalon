import React from "react";
import { Outlet } from "react-router-dom";

import { Splash } from "components";
import { generateUniqueId } from "utils";

export const Root = () => {
  const deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    localStorage.setItem("deviceId", generateUniqueId());
  }

  return (
    <>
      {!deviceId && <Splash />}
      {deviceId && <Outlet />}
    </>
  );
};
