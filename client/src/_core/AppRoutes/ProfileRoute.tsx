import { PROFILE_ROUTE } from "_constants";
import { lazy } from "react"

const ProfilePage =  lazy(() => import("pages/profile"));

export const profileRoutes = [{ path: `${PROFILE_ROUTE}/:username`, element: <ProfilePage />}]