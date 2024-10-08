import { LANDING_PAGE_ROUTE, LOGIN_ROUTE } from "_constants";
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

const authorizedStructure = {
    fallbackPath: LOGIN_ROUTE,
    routes: [
        ...homeRoutes,
        ...projectRoutes,
        ...bugRoutes,
        ...userRoutes,
        ...profileRoutes,
        ...roleRoutes
    ]
};

const unAuthorizedStructure = {
    fallbackPath: LANDING_PAGE_ROUTE,
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
    routes: [
      ...landingPageRoutes,
      ...registerSuccessPageRoutes,
      ...verifyPageRoutes
    ],
  };

export {
    authorizedStructure,
    unAuthorizedStructure,
    anonymousStructure,
    alwaysStructure,
  };
  