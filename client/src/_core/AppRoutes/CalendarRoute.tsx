import { CALENDAR_ROUTE } from "_constants";
import { lazy } from "react"

const Calendar =  lazy(() => import("pages/calendar"));

export const calendarRoutes = [{ path: CALENDAR_ROUTE, element: <Calendar />}]