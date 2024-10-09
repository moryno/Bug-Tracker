import { LOGIN_API, PHOTO_API, successResponseContent } from "_constants";
import { getAccessToken, notify } from "_helpers";
import axios from "axios";

const uploadRequest = axios.create({
  baseURL:
    "http://bug-tracker-ebs-env.eba-bmrgva3p.eu-north-1.elasticbeanstalk.com/api",
});

const handleSuccessResponse = (response: any) => {
  const {
    status,
    config: { url, method },
  } = response;
  if (status === 200 || status === 201) {
    if (
      successResponseContent[url] &&
      (method === "post" || method === "put")
    ) {
      notify({
        success: true,
        ...successResponseContent[url],
      });
    }
  }
  return response;
};

const handleErrorResponse = (error: {
  response: { status: any; data: any; config: { url: string } };
  message: any;
}) => {
  const {
    status,
    data,
    config: { url },
  } = error.response;
  if (status >= 400) {
    let description =
      data?.errors?.error ||
      data?.error?.message ||
      data?.error ||
      data?.message ||
      error?.message ||
      "";
    const userNotFound = status === 404 && url === LOGIN_API;
    if (status === 401) {
      // store.dispatch({ type: LOGOUT });
      description = "Session has expired. Please log in again";
    }
    if (status === 403) {
      description = "You are not authorized to perform this action.";
    }
    if (!userNotFound) {
      notify({
        message: "Error",
        description: description,
        error: true,
      });
    }
  }
  return Promise.reject(error);
};

uploadRequest.interceptors.request.use((request) => {
  request.headers["Content-Type"] = "multipart/form-data";
  const token = getAccessToken();
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }

  return request;
});

uploadRequest.interceptors.response.use(
  handleSuccessResponse,
  handleErrorResponse
);

const uploadPhoto = (file: Blob) => {
  return uploadRequest.post(PHOTO_API, file);
};

export const PhotoService = {
  uploadPhoto,
};
