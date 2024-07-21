import { HOME_ROUTE } from "_constants";
import { lazy } from "react"

const Home =  lazy(() => import("pages/home"));

export const homeRoutes = [{ path: HOME_ROUTE, element: <Home />}]