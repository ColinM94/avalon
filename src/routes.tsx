import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorPage, HomePage, InvalidPage } from "pages";
import { MainLayout } from "layouts/mainLayout/mainLayout";

const routes = (
  <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
    <Route path="*" element={<InvalidPage />} />
    <Route index element={<HomePage />} />
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(routes));
