import ErrorImage from "_assets/images/other/error.png";
import React from "react";
import { StyledAppError } from "./index.styled";
import { Space, Typography } from "antd";

const AppError = ({ description, noContent }: { description: string, noContent: boolean }) => {
  const title = noContent? "Nothing here 😔": "Looks cold in here"

  return (
    <StyledAppError
      image={ErrorImage}
      description={
        <Space direction="vertical">
          <Title level={4}>{title}</Title>
          {description && <Text>{description}</Text>}
        </Space>
      }
    />
  );
};

const { Title, Text } = Typography;
export default AppError;
