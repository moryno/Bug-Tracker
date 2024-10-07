import { successResponseContent } from "_constants";
import { LOGIN_API } from "_constants/api";
import { getAccessToken, notify } from "_helpers";
import axios from "axios";

const request = axios.create({
  baseURL:
    "https://bug-tracker-api-ebs-env.eba-4nd8dq6a.eu-north-1.elasticbeanstalk.com/api",
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

const appendPayloadToRequestData = (request: any) => {
  if (request.method === "post") {
    request.data = {
      ...(request.data || {}),
    };
  }
};

request.interceptors.request.use((request) => {
  request.headers["Content-Type"] = "application/json";
  const token = getAccessToken();
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }

  appendPayloadToRequestData(request);
  return request;
});

request.interceptors.response.use(handleSuccessResponse, handleErrorResponse);

export { request };
