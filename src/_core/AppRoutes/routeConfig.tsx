import { GoHomeFill } from "react-icons/go";
import { FaBriefcase, FaBug  } from "react-icons/fa";
import { MdPeople } from "react-icons/md";

import { HOME_ROUTE, PROJECT_ROUTE, BUG_ROUTE, USER_ROUTE } from "_constants";

export const routeConfig = [
    {
        id: "home",
        title: "Home",
        messageId: "sidebar.home",
        icon: <GoHomeFill size={18} />,
        mobileOnly: true,
        path: HOME_ROUTE,
    },
    {
        id: "projects",
        title: "Projects",
        messageId: "sidebar.projects",
        icon: <FaBriefcase size={18} />,
        mobileOnly: true,
        path: PROJECT_ROUTE,
    },
    {
        id: "bugs",
        title: "Bugs",
        messageId: "sidebar.bugs",
        icon: <FaBug size={18} />,
        mobileOnly: true,
        path: BUG_ROUTE,
    },
    {
        id: "users",
        title: "Users",
        messageId: "sidebar.users",
        icon: <MdPeople size={18} />,
        mobileOnly: true,
        path: USER_ROUTE,
    },
]