import { VERIFY_EMAIL_ROUTE } from "_constants";
import { lazy } from "react";

const VerifyEmailPage = lazy(() => import("pages/register/VerifyEmail"));

export const verifyPageRoutes = [
    { path: VERIFY_EMAIL_ROUTE, element: <VerifyEmailPage />}
]