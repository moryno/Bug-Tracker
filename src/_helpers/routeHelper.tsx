import { Navigate } from "react-router-dom";

type structureType = {
    authorizedStructure: any,
    unAuthorizedStructure: any,
    anonymousStructure: any,
    isAuthenticated: boolean,
    alwaysStructure: any,
}
export const generateRoutes = (structure: structureType) => {
    const {
        authorizedStructure,
        unAuthorizedStructure,
        anonymousStructure,
        isAuthenticated,
        alwaysStructure,

    } = structure || {};

    const dynamicRoutes = [];

  if (authorizedStructure) {
    dynamicRoutes.push(
      ...routesGenerator(isAuthenticated, authorizedStructure, "authorized")
    );
  }
  if (anonymousStructure) {
    dynamicRoutes.push(
      ...routesGenerator(isAuthenticated, anonymousStructure, "anonymous")
    );
  }
  if (unAuthorizedStructure) {
    dynamicRoutes.push(
      ...routesGenerator(isAuthenticated, unAuthorizedStructure, "unauthorized")
    );
  }
  if (alwaysStructure) {
    dynamicRoutes.push(
      ...routesGenerator(isAuthenticated, alwaysStructure, "always")
    );
  }
  if (dynamicRoutes.length > 0) {
    dynamicRoutes.push({
      path: "*",
      element: (
        <Navigate
          to={
            isAuthenticated
              ? unAuthorizedStructure.fallbackPath
              : authorizedStructure.fallbackPath
          }
          replace
        />
      ),
    });
  }
  return dynamicRoutes;
}

const routesGenerator = (
    isAuthenticated = false,
    routeSet: any = {},
    type = "anonymous",
) => {
const generatedRoutes: object[] = [];
  let { fallbackPath = "", redirectPath = "" } = routeSet || {};

  const isAnonymous = type === "anonymous";
  const isAuthorized = type === "authorized";
  const isUnauthorized = type === "unauthorized";
  const isAlways = type === "always";

  if (routeSet?.routes) {
    const routes = routeSet.routes;
    if (Array.isArray(routes) && routes.length > 0) {
      routes.forEach((route) => {
        if (isAnonymous) {
          generatedRoutes.push(route);
        }
        if (isAuthorized) {
          generatedRoutes.push(
            isAuthenticated
              ? route
              : {
                  path: route.path,
                  element: <Navigate to={fallbackPath} replace />,
                }
          );
        }
        if (isUnauthorized) {
          generatedRoutes.push(
            !isAuthenticated
              ? route
              : {
                  path: route.path,
                  element: (
                    <Navigate to={redirectPath || fallbackPath} replace />
                  ),
                }
          );
        }
        if (isAlways) {
          generatedRoutes.push(route);
        }
      });
    }
  }

  return generatedRoutes;

}