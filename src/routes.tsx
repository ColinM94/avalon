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

import { Main } from "./main";

const routes = (
  <Route path="/" element={<Main />} errorElement={<ErrorPage />}>
    <Route path="*" element={<InvalidPage />} />
    <Route index element={<MainMenuPage />} />
    <Route path="setup" element={<SetupPage />} />
    <Route path="join/:sessionId?" element={<JoinPage />} />
    <Route path="characters" element={<CharactersPage />} />
    <Route path="play/:sessionId" element={<PlayPage />} />
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(routes));
