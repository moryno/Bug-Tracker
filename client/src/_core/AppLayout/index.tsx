import { useMemo } from "react";
import { useRoutes } from "react-router-dom";
import {
    authorizedStructure,
    unAuthorizedStructure,
    anonymousStructure,
    alwaysStructure,
  } from "_core/AppRoutes";
import { generateRoutes } from "_helpers";
import { useAuthUser } from "_hooks";
import { Layout } from "_lib";
import AnonymousRouteLayout from "_lib/Layout/AnonymousRouteLayout";

const AppLayout = () => {
    const { isAuthenticated } = useAuthUser();

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
    !isAuthenticated ? <AnonymousRouteLayout routes={routes} /> :
    <Layout routes={routes} />
  )
}

export default AppLayout