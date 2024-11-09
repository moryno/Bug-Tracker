import { HOME_ROUTE, LANDING_PAGE_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "_constants";
import { Navigate } from "react-router-dom";
import { projectRoutes } from "./ProjectRoutes";
import { bugRoutes } from "./BugRoutes";
import { authRoutes } from "./AuthRoutes";
import { homeRoutes } from "./HomeRoutes";
import { landingPageRoutes } from "./LandingPageRoutes";
import { userRoutes } from "./UserRoutes";
import { profileRoutes } from "./ProfileRoute";
import { roleRoutes } from "./RoleRoutes";
import { registerSuccessPageRoutes } from "./RegisterSuccessRoute";
import { verifyPageRoutes } from "./VerifyEmailRoute";
import { calendarRoutes } from "./CalendarRoute";
import { eventRoutes } from "./EventRoute";

const authorizedStructure = {
    fallbackPath: LOGIN_ROUTE,
    routes: [
        ...homeRoutes,
        ...projectRoutes,
        ...bugRoutes,
        ...userRoutes,
        ...profileRoutes,
        ...roleRoutes,
        ...calendarRoutes,
        ...eventRoutes
    ]
};

const unAuthorizedStructure = {
    fallbackPath: HOME_ROUTE,
    redirectPath: "",
    routes: [...authRoutes]
};

const anonymousStructure = {
    routes: {
        path: LANDING_PAGE_ROUTE,
        element: <Navigate to={LANDING_PAGE_ROUTE} />
    }
};


const alwaysStructure = {
    fallbackPath: PROFILE_ROUTE,
    routes: [
      ...landingPageRoutes,
      ...registerSuccessPageRoutes,
      ...verifyPageRoutes,
    ],
  };

export {
    authorizedStructure,
    unAuthorizedStructure,
    anonymousStructure,
    alwaysStructure,
  };
  