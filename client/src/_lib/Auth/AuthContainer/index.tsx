import { useCallback } from 'react'
import { StyledAuthContainerContent, StyledAuthContainerMain, StyledAuthFormTitle } from './index.style'
import AuthContainerForm from './AuthContainerForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIsRegisterRoute } from '_helpers';
import { FaBug } from 'react-icons/fa';

const AuthContainer = () => {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const isRegisterRoute = getIsRegisterRoute(pathname, search);

  const onRedirect = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate]
  );

  return (
    <StyledAuthContainerMain>
        <StyledAuthContainerContent>
          <FaBug size={22} />
         <StyledAuthFormTitle >Bug Tracker {isRegisterRoute ? "Register" : "Login" }</StyledAuthFormTitle>
        </StyledAuthContainerContent>
        <AuthContainerForm 
          isRegisterRoute={isRegisterRoute}
          onRedirect={onRedirect}
        />
    </StyledAuthContainerMain>
  )
}
export default AuthContainer