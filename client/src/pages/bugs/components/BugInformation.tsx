import { Col, Collapse, Row, Tag } from "antd";
import {
  StyledStatusDot,
  StyledStatusWrapper,
} from "../index.styled";
import {
  PanelTitle,
  PopoverComponent,
  StyledCardWrapper,
  StyledInfoDivContainer,
  StyledInfoDivWrapper,
  StyledInfoLabel,
  StyledInfoText
} from "_lib";
import { IBug } from "interfaces";
import moment from "moment";
import { assigneeColumns } from "../columns";

const { Panel } = Collapse;

const BugInformation = ({ bug }: { bug: IBug }) => {
  const followers = bug?.assignees?.map(assinee => ({ userName: assinee?.userName, fullName: assinee?.fullName}));

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
                 <PopoverComponent dataSource={followers} columns={assigneeColumns} />
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
                  <StyledStatusDot color={bug?.bugStatus === "Open" ? "active" : bug?.bugStatus === "InProgress" ? "inProgress" : "completed"}  />
                  <StyledInfoText>{ bug?.bugStatus }</StyledInfoText>
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
                <StyledInfoText>{moment(bug?.dueDate).format('MMMM Do YYYY h:mm:ss a')}</StyledInfoText>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Severity</StyledInfoLabel>
              </Col>
              <Col span={12}>
              <Tag color={`${bug?.severity === "Minor" ? "#2CC8BA" : bug?.severity === "Major" ? "#08AEEA" : bug?.severity === "Critical" ? "#FFBB28" : "#EF476F"}`}>{bug?.severity}</Tag>
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
                <Tag color="#2CC8BA">{bug?.classification}</Tag>
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
