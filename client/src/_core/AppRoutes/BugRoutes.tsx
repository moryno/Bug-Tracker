import { BUG_ROUTE } from "_constants"
import { lazy } from "react"

const Bugs = lazy(() => import("pages/bugs"));
const BugDetail = lazy(() => import("pages/bugs/components/BugDetail"));

export const bugRoutes = [
    { path: BUG_ROUTE, element: <Bugs />},
    { path: `${BUG_ROUTE}/:id`, element: <BugDetail />}
]