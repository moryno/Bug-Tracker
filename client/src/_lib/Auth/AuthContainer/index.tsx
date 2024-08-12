import { useCallback } from 'react'
import { StyledAuthContainerContent, StyledAuthContainerMain, StyledAuthFormTitle } from './index.style'
import AuthContainerForm from './AuthContainerForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIsRegisterRoute } from '_helpers';
import { FaBug } from 'react-icons/fa';
import { login, register } from '_redux';
import { useDispatch } from 'react-redux';

const AuthContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname, search } = useLocation();
    const isRegisterRoute = getIsRegisterRoute(pathname, search);

  const onRedirect = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate]
  );

  const onFinish = useCallback((values: any) => {
    if(isRegisterRoute){
      register(dispatch, values)
    }else{
      login(dispatch, values)
    }
  }, [dispatch, isRegisterRoute]);

  return (
    <StyledAuthContainerMain>
        <StyledAuthContainerContent>
          <FaBug size={22} />
         <StyledAuthFormTitle >Bug Tracker {isRegisterRoute ? "Register" : "Login" }</StyledAuthFormTitle>
        </StyledAuthContainerContent>
        <AuthContainerForm 
          isRegisterRoute={isRegisterRoute}
          onRedirect={onRedirect}
          onFinish={onFinish}
        />
    </StyledAuthContainerMain>
  )
}
export default AuthContainer