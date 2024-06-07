import React from "react";
import { Splash } from "components";
import { Outlet } from "react-router-dom";

export const Root = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <>
      <Splash show={showSplash} setShow={setShowSplash} />
      <Outlet />
    </>
  );
};
