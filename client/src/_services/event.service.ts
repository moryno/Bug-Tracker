import { HubConnection } from "@microsoft/signalr";
import { EVENT_API } from "_constants";
import { PaginationResult } from "_lib";
import { commentType, IEvent } from "interfaces";
import { request } from "utils";

const getCalendarEvent = (username: string) => {
  return request.get(`${EVENT_API}/${username}/calendar`);
};
const createEvent = async (
  event: IEvent,
  hubConnection: HubConnection | null
) => {
  try {
    return await hubConnection?.invoke("SendNotification", event);
  } catch (error) {
    await hubConnection!
      .stop()
      .catch((err) => console.log("Error with connection: ", err));
    console.log(error);
  }

  //  request.post(EVENT_API, event);
};
const createEventComment = (comment: commentType) => {
  return request.post(`${EVENT_API}/comment`, comment);
};
const getEventComments = (id: string) => {
  return request.get(`${EVENT_API}/${id}/comment`);
};
const deleteEventComment = (id: string) => {
  return request.delete(`${EVENT_API}/${id}/comment`);
};
const editEvent = (event: IEvent) => {
  const {
    id,
    createdDate,
    createdUser,
    updatedDate,
    updatedUser,
    attendees,
    projectName,
    comments,
    ...res
  } = event;
  return request.put(`${EVENT_API}/${id}`, res);
};
const getAllEvents = (params?: object) => {
  return request.get<PaginationResult<IEvent[]>>(EVENT_API, { params });
};
const getEventDetails = (id: string) => {
  return request.get(`${EVENT_API}/${id}`);
};
const deleteEvent = (id: string) => {
  return request.delete(`${EVENT_API}/${id}`);
};

export const EventService = {
  createEvent,
  getCalendarEvent,
  editEvent,
  getAllEvents,
  getEventDetails,
  createEventComment,
  getEventComments,
  deleteEventComment,
  deleteEvent,
};
