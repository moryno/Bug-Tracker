import { Col, Collapse, Row } from "antd";
import {
  StyledStatusDot,
  StyledStatusWrapper,
} from "../index.styled";
import {
  PanelTitle,
  StyledCardWrapper,
  StyledInfoDivContainer,
  StyledInfoDivWrapper,
  StyledInfoLabel,
  StyledInfoText,
  StyledUserIcon,
  StyledUserWrapper,
} from "_lib";
import { IBug } from "interfaces";
import moment from "moment";

const { Panel } = Collapse;

const BugInformation = ({ bug }: { bug: IBug }) => {
  return (
    <StyledCardWrapper>
      <Collapse defaultActiveKey={["1"]} ghost>
      <Panel header={<PanelTitle>Bug Information</PanelTitle>} key="1">
        <Row gutter={16}>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Assignee</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledUserWrapper>
                  <StyledUserIcon>MN</StyledUserIcon>
                  <StyledInfoText>Maurice Nganga</StyledInfoText>
                </StyledUserWrapper>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Status</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledStatusWrapper>
                  <StyledStatusDot />
                  <StyledInfoText>Open</StyledInfoText>
                </StyledStatusWrapper>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
        </Row>
        <Row gutter={16}>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Due Date</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledInfoText>{moment(bug?.dueDate).format('MMMM Do YYYY, h:mm:ss a')}</StyledInfoText>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Severity</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledInfoText>{bug?.severity}</StyledInfoText>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
        </Row>
        <Row gutter={16}>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Classification</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledInfoText>{bug?.classification}</StyledInfoText>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Status</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledInfoText>{bug?.bugStatus}</StyledInfoText>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
        </Row>
      </Panel>
    </Collapse>
    </StyledCardWrapper>
  );
};

export default BugInformation;
