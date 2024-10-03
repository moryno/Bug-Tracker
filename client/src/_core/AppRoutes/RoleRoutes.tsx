import { ROLES_ROUTE } from "_constants";
import { lazy } from "react";

const Roles = lazy(() => import("pages/roles"))

export const roleRoutes = [
    { path: ROLES_ROUTE, element: <Roles />}
]