import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  ErrorPage,
  MainMenuPage,
  InvalidPage,
  LobbyPage,
  SetupPage,
  CharactersPage,
  JoinPage,
  RitualPage,
} from "pages";

import { Root } from "./root";

const routes = (
  <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
    <Route path="*" element={<InvalidPage />} />
    <Route index element={<MainMenuPage />} />
    <Route path="setup" element={<SetupPage />} />
    <Route path="join" element={<JoinPage />} />
    <Route path="characters" element={<CharactersPage />} />
    <Route path="lobby/:code" element={<LobbyPage />} />
    <Route path="ritual" element={<RitualPage />} />
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(routes));
