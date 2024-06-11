import { Outlet } from "react-router-dom";

import { Splash } from "components";
import { generateUniqueId } from "utils";
import { MainLayout } from "layouts/mainLayout/mainLayout";

export const Root = () => {
  const playerId = localStorage.getItem("playerId");

  if (!playerId) {
    localStorage.setItem("playerId", generateUniqueId());
  }

  return (
    <MainLayout>
      <Splash />
      <Outlet />
    </MainLayout>
  );
};
