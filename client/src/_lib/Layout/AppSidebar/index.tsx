import {
  StyledAppSidebarScrollbar,
} from "./index.styled";
import MainSidebar from "./MainSidebar";
import AppVerticalNav from "../AppVerticalNav";

const AppSidebar = () => {

  return (
    <MainSidebar>
      <StyledAppSidebarScrollbar>
        <AppVerticalNav />
      </StyledAppSidebarScrollbar>
    </MainSidebar>
  )
}

export default AppSidebar