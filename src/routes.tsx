import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorPage, HomePage, InvalidPage, LobbyPage, SetupPage } from "pages";
import { MainLayout } from "layouts/mainLayout/mainLayout";

const routes = (
  <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
    <Route path="*" element={<InvalidPage />} />
    <Route index element={<HomePage />} />
    <Route path="setup" element={<SetupPage />} />
    <Route path="lobby/:code" element={<LobbyPage />} />
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(routes));
