import { NOTIFICATIONS_API } from "_constants";
import { emailType } from "interfaces";
import { request } from "utils";

const getNotifications = (username: string) => {
  return request.get(`${NOTIFICATIONS_API}/${username}`);
};
const sendEmailToTeamMember = (payload: emailType) => {
  return request.post(`${NOTIFICATIONS_API}/sendEmail`, payload);
};
const markAsRead = (payload: { id: string }) => {
  return request.post(`${NOTIFICATIONS_API}/markAsRead`, payload);
};
const markAllAsRead = () => {
  return request.post(`${NOTIFICATIONS_API}/markAllAsRead`, {});
};

export const NotificationService = {
  getNotifications,
  sendEmailToTeamMember,
  markAsRead,
  markAllAsRead,
};
