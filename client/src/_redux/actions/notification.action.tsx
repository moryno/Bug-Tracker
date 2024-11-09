import { Dispatch } from "@reduxjs/toolkit";
import { notificationLoadingFailure, notificationLoadingStart, notificationLoadingSuccess } from "_redux/slices/notificationSlice";
import { NotificationService } from "_services";

export const loadNotifications = async (dispatch: Dispatch, username: string) => {
    try {
      dispatch(notificationLoadingStart())
      const { data } = await NotificationService.getNotifications(username);
      dispatch(notificationLoadingSuccess(data));
    } catch (error) {
      dispatch(notificationLoadingFailure())
      console.log(error);
    }
  };