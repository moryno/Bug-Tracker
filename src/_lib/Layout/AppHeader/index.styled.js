import { Layout } from "antd";
import { MdOutlineAddBox } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { styled } from "styled-components";

const { Header } = Layout;

export const StyledAppHeader = styled(Header)`
  ${"" /* width: 100%; */}
  position: sticky;
  left: 0;
  top: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  height: ${({ theme }) => `${theme.header.height}px`};
  background-color: ${({ theme }) => theme.palette.background.paper}!important;
  padding: 0px 16px;
  border-bottom: 1px solid
    ${({ theme }) => theme.palette.grey["Cool Grey"][200]};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    left: 0;
    margin-bottom: 0px;
    .ant-input-affix-wrapper {
      display: none;
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xxs}px) {
    padding: 0px 5px;
  }
`;

export const StyledAppHeaderLeft = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const StyledAppHeaderToggleSidebar = styled(GiHamburgerMenu).attrs({
  size: "24px",
})``;

export const StyledAppHeaderPage = styled.h2`
  font-weight: 500;
`;

export const StyledAppHeaderRight = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-end;
`;
export const StyledAppHeaderAdd = styled(MdOutlineAddBox).attrs({
  size: "22px",
})``;

export const StyledAppHeaderSearch = styled(CiSearch).attrs({
  size: "22px",
})``;

export const StyledAppHeaderNotification = styled(
  IoIosNotificationsOutline
).attrs({
  size: "22px",
})``;

export const StyledAppHeaderAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
