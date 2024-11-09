import { createSlice } from "@reduxjs/toolkit";
import { INotification } from "interfaces";

interface INotificationState {
  notifications: INotification[] | null;
  notificationCount: number;
  isFetching: boolean;
  error: boolean;
}

const initialState: INotificationState = {
  notifications: null,
  notificationCount: 0,
  isFetching: false,
  error: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationLoadingStart: (state) => {
      state.isFetching = true;
    },
    notificationLoadingStop: (state) => {
      state.isFetching = false;
    },
    notificationLoadingSuccess: (state, action) => {
      state.isFetching = false;
      state.notifications = action.payload;

      state.notificationCount = state.notifications
        ? state.notifications.length
        : 0;
    },
    notificationUpdatingSuccess: (state, action) => {
      state.isFetching = false;

      if (!state.notifications) {
        state.notifications = [];
      }

      state.notifications = [action.payload, ...state.notifications];

      state.notificationCount = state.notifications.length;
    },
    notificationLoadingFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  notificationLoadingStart,
  notificationLoadingStop,
  notificationLoadingSuccess,
  notificationLoadingFailure,
  notificationUpdatingSuccess,
} = notificationSlice.actions;

export default notificationSlice.reducer;
