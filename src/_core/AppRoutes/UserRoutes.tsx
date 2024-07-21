import { USER_ROUTE } from "_constants";
import { lazy } from "react";

const Users = lazy(() => import("pages/users"));

export const userRoutes = [
    { path: USER_ROUTE, element: <Users />}
]