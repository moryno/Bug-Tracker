import { DASHBOARD_API } from "_constants";
import { request } from "utils";

const getDashboardCountStats = async () => {
  return await request.get(`${DASHBOARD_API}/count`);
};
const getDashboardGridStats = async () => {
  return await request.get(`${DASHBOARD_API}/grid-stats`);
};

export const dashboardService = {
  getDashboardCountStats,
  getDashboardGridStats,
};
