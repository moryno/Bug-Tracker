export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (value: string) => {
  localStorage.setItem("accessToken", value);
};
