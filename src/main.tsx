import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { LoadingOverlay } from "components";
import { router } from "./routes";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} fallbackElement={<LoadingOverlay />} />
);
