import { useAuthUser } from '_hooks';
import React, { ReactNode } from 'react'

const AuthRoutes = ({ children } : { children: ReactNode }) => {
    // const { isLoading } = useAuthUser();
    // return isLoading ? <AppLoader /> : <>{children}</>;
  return (
    <>{ children }</>
  )
}

export default AuthRoutes