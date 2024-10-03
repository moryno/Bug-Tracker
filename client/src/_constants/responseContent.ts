import {
  BUG_COMMENTS_API,
  BUGS_API,
  PHOTO_API,
  PROJECT_COMMENTS_API,
  PROJECTS_API,
  REGISTER_API,
} from "./api";
interface SuccessResponseContent {
  [key: string]: {
    message: string;
    description: string;
  };
}
export const successResponseContent: SuccessResponseContent = {
  [REGISTER_API]: {
    message: "Account",
    description: "Register was successful",
  },
  [PROJECTS_API]: {
    message: "Success",
    description: "Creating project was successful",
  },
  [BUGS_API]: {
    message: "Success",
    description: "Creating bugs was successful",
  },
  [PROJECT_COMMENTS_API]: {
    message: "Success",
    description: "Saving comment was successful",
  },
  [BUG_COMMENTS_API]: {
    message: "Success",
    description: "Saving comment was successful",
  },
  [PHOTO_API]: {
    message: "Success",
    description: "Saving photo was successful",
  },
};
