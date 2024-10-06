import { REGISTER_SUCCESS_ROUTE } from "_constants";
import { lazy } from "react";

const RegisterSuccessPage = lazy(() => import("pages/register/RegisterSuccess"));

export const registerSuccessPageRoutes = [
    { path: REGISTER_SUCCESS_ROUTE, element: <RegisterSuccessPage />}
]