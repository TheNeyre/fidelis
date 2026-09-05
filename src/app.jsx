import MainPage from "./pages/main/page";
import NotFoundPage from "./pages/notfound/page";
import { useRoutes } from "react-router-dom";
import "./normalize.css";
import "./globals.css";
export default function App () {
  return useRoutes([
    { path: "/", element: ( <MainPage/>) },
    { path: "*", element: ( <NotFoundPage/> ) }
  ]);
}