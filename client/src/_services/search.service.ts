import { PROJECTS_API, BUGS_API, DomianEnum, EVENT_API } from "_constants";
import { request } from "utils";

const getSearchResult = (params: object, type: string) => {
  const Url =
    type === DomianEnum.PROJECTS
      ? PROJECTS_API
      : type === DomianEnum.BUGS
      ? BUGS_API
      : EVENT_API;

  return request.get(`${Url}/search`, { params });
};

export const searchService = {
  getSearchResult,
};
