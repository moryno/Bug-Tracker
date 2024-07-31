import { useLocation } from 'react-router-dom';
import { StyledVerticalNav } from './index.styled';
import { getRouteMenus } from '_helpers';
import { routeConfig } from '_core/AppRoutes/routeConfig';

const AppVerticalNav = () => {
    const { pathname } = useLocation();

  return (
    <StyledVerticalNav 
        items={getRouteMenus(routeConfig)}
        mode="inline"
        selectedKeys={[pathname]}
     />
  )
}

export default AppVerticalNav