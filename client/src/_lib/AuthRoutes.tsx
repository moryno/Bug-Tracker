import { RootState } from '_redux';
import { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import AppLoader from './AppLoader';

const AuthRoutes = ({ children } : { children: ReactNode }) => {
  const { isFetching } = useSelector((store: RootState) => store.user);
    return isFetching ? <AppLoader /> : <>{children}</>;

}

export default AuthRoutes