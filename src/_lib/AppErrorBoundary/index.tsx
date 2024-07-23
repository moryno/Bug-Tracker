import React, { Component, ErrorInfo } from 'react';
import { StyledAppBoundary } from './index.styled';
import ErrorIcon from './ErrorIcon';
import { Typography } from 'antd';
import { hardRefreshAndEmptyCache } from '_helpers';
import ContainerButton from '_lib/ContainerButton';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

 static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error in Shell: ', error, errorInfo);

  }

  render() {
    if (this.state.hasError) {
      return <StyledAppBoundary>
        <ErrorIcon />
        <Title level={4}>Ah! Something went wrong.</Title>
          <Text type="secondary">
            Brace yourself till we get the error fixed.
          </Text>
          <Text type="secondary">
            You may also refresh the page or try again latter
          </Text>
          <br />
          <ContainerButton
            title="Refresh"
            type="primary"
            onClick={hardRefreshAndEmptyCache}
            size="large"
          />
      </StyledAppBoundary>;
    }

    return this.props.children;
  }
}

const { Title, Text } = Typography;

export default AppErrorBoundary;