import { notification } from "antd";
import { getTitleCaseSentence } from "_helpers";

export const notify = ({
  message,
  description = "",
  error = false,
  success = false,
  info = false,
  warning = false,
  loading = false,
  configs = { duration: 3 },
}) => {
  const alertTypes = { error, success, info, warning, loading };
  const selectedAlertType = Object.keys(alertTypes).find(
    (key) => alertTypes[key]
  );
  const alertOptions = {
    message: message || `${getTitleCaseSentence(selectedAlertType)}`,
    description,
    content: description,
    ...configs,
  };

  notification[selectedAlertType](alertOptions);
};
