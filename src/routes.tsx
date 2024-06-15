import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  ErrorPage,
  MainMenuPage,
  InvalidPage,
  SetupPage,
  CharactersPage,
  JoinPage,
  PlayPage,
} from "pages";

import { Root } from "./main";

const routes = (
  <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
    <Route path="*" element={<InvalidPage />} />
    <Route index element={<MainMenuPage />} />
    <Route path="setup" element={<SetupPage />} />
    <Route path="join/:sessionId?" element={<JoinPage />} />
    <Route path="characters" element={<CharactersPage />} />
    <Route path="play" element={<PlayPage />} />
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(routes));
