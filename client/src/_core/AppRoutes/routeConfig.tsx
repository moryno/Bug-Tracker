import { GoHomeFill } from "react-icons/go";
import { FaBriefcase, FaBug, FaCalendarAlt, FaRegUserCircle, FaUserCog  } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { MdEvent, MdPeople } from "react-icons/md";

import { HOME_ROUTE, PROJECT_ROUTE, BUG_ROUTE, USER_ROUTE, PROFILE_ROUTE, ROLES_ROUTE, CALENDAR_ROUTE, EVENT_ROUTE } from "_constants";

export const routeConfig = [
    {
        id: "home",
        title: "Home",
        messageId: "sidebar.home",
        icon: <GoHomeFill size={16} />,
        mobileOnly: true,
        path: HOME_ROUTE,
    },
    {
        id: "projects",
        title: "Projects",
        messageId: "sidebar.projects",
        icon: <FaBriefcase size={16} />,
        mobileOnly: true,
        path: PROJECT_ROUTE,
    },
    {
        id: "bugs",
        title: "Bugs",
        messageId: "sidebar.bugs",
        icon: <FaBug size={16} />,
        mobileOnly: true,
        path: BUG_ROUTE,
    },
    {
        id: "calendar",
        title: "Calendar",
        messageId: "sidebar.calendar",
        icon: <FaCalendarAlt size={16} />,
        mobileOnly: true,
        path: CALENDAR_ROUTE,
    },
    {
        id: "events",
        title: "Events",
        messageId: "sidebar.events",
        icon: <MdEvent size={20} />,
        mobileOnly: true,
        path: EVENT_ROUTE,
    },
    {
        id: "users",
        title: "User Management",
        messageId: "sidebar.users",
        icon: <FaUsersGear  size={16} />,
        type: "collapse",
        children: [
            {
                id: "users.team",
                title: "Team",
                messageId: "sidebar.users.team",
                icon: <MdPeople size={18} />,
                mobileOnly: true,
                path: USER_ROUTE,
            },
            {
                id: "users.profile",
                title: "Profile",
                messageId: "sidebar.users.profile",
                icon: <FaRegUserCircle  size={18} />,
                mobileOnly: true,
                path: PROFILE_ROUTE,
            },
            {
                id: "users.role",
                title: "Roles",
                messageId: "sidebar.users.role",
                icon: <FaUserCog   size={18} />,
                mobileOnly: true,
                path: ROLES_ROUTE,
            },
        ]
        // mobileOnly: true,
        // path: USER_ROUTE,
    },
]