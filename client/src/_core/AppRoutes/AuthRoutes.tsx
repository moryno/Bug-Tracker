import { LOGIN_ROUTE } from "_constants";
import { lazy } from "react";

const Login = lazy(() => import("pages/login"));

export const authRoutes = [
    { path: LOGIN_ROUTE, element: <Login />}
]