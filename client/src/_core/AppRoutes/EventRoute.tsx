import { EVENT_ROUTE } from "_constants";
import { lazy } from "react"

const Events =  lazy(() => import("pages/events"));

export const eventRoutes = [{ path: EVENT_ROUTE, element: <Events />}]