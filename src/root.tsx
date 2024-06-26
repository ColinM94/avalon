import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { initIcons } from "inits/initIcons";
import { LoadingOverlay } from "components";

import { router } from "./routes";
import "./styles/global.scss";

initIcons();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} fallbackElement={<LoadingOverlay />} />
);
