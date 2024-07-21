import { LANDING_PAGE_ROUTE } from "_constants";
import { lazy } from "react";

const LandingPage = lazy(() => import("pages/landing-page"));

export const landingPageRoutes = [
    { path: LANDING_PAGE_ROUTE, element: <LandingPage />}
]