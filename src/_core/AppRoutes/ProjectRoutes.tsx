import { PROJECT_ROUTE } from "_constants";
import { lazy } from "react";

const Projects = lazy(() => import("pages/projects"));
const ProjectDetail = lazy(() => import("pages/projects/components/ProjectDetail"));

export const projectRoutes = [
    { path: PROJECT_ROUTE, element: <Projects />},
    { pathe: `${PROJECT_ROUTE}/:id`, element: <ProjectDetail />}
]