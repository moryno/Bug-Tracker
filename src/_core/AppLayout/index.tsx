import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import {
    authorizedStructure,
    unAuthorizedStructure,
    anonymousStructure,
    alwaysStructure,
  } from "_core/AppRoutes";
  import { generateRoutes } from "_helpers";
import { useAuthUser } from "_hooks";

const AppLayout = () => {
    const { isAuthenticated, user } = useAuthUser();
    const { pathname } = useLocation();

    const generatedRoutes = useMemo(() => {
        return generateRoutes({
            isAuthenticated,
            authorizedStructure,
            unAuthorizedStructure,
            anonymousStructure,
            alwaysStructure,
        })
      }, [isAuthenticated]);
    
      const routes = useRoutes(generatedRoutes);

  return (
    <div>index</div>
  )
}

export default AppLayout