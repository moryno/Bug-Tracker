import { Col, Collapse, Row, Tag } from "antd";
import {
  StyledAssigneeContainer,
  StyledAssigneeImage,
  StyledAssigneeName,
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
import { IProject } from "interfaces";
import { getAbbreviation } from "_helpers";
import moment from "moment";

const { Panel } = Collapse;

const ProjectInformation= ({ project } : { project : IProject}) => {
  const status = project.currentStatus!;

  return (
    <StyledCardWrapper>
      <Collapse defaultActiveKey={["1"]} ghost>
      <Panel header={<PanelTitle>Project Information</PanelTitle>} key="1">
        <Row gutter={16}>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Owner</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledUserWrapper>
                  {
                    project?.image ?
                    <StyledAssigneeContainer>
                      <StyledAssigneeImage src={project?.image || "/img/noavatar.jpg"} alt={project?.fullName} />
                     <StyledAssigneeName>{project?.fullName}</StyledAssigneeName>
                    </StyledAssigneeContainer>
                    :
                     <>
                    <StyledUserIcon>
                       {getAbbreviation(project?.fullName ?? '')}
                    </StyledUserIcon>
                    <StyledInfoText>{project?.fullName ?? ''}</StyledInfoText>
                    </>
                  }
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
                  <StyledStatusDot color={status === "Delayed"  ? "delayed" : status === "Active" ? "active" : status === "InProgress" ? "inProgress" : status === "OnTrack" ? "onTrack" : status === "InTesting" ? "inTesting" : "onHold"} />
                  <StyledInfoText>{status}</StyledInfoText>
                </StyledStatusWrapper>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
        </Row>
        <Row gutter={16}>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Priority</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <Tag color={`${project?.priority === "High" ? "#EF476F" : project?.priority === "Low" ? "#2CC8BA" : "#08AEEA"}`}>{project?.priority}</Tag>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Project Group</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledInfoText>{project?.projectGroup || "No Grouping"}</StyledInfoText>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
        </Row>
        <Row gutter={16}>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>Start Date</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledInfoText>{moment(project?.startDate).format('MMMM Do YYYY h:mm:ss a')}</StyledInfoText>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
          <StyledInfoDivContainer span={12}>
            <StyledInfoDivWrapper>
              <Col span={12}>
                <StyledInfoLabel>End Date</StyledInfoLabel>
              </Col>
              <Col span={12}>
                <StyledInfoText>{moment(project?.endDate).format('MMMM Do YYYY h:mm:ss a')}</StyledInfoText>
              </Col>
            </StyledInfoDivWrapper>
          </StyledInfoDivContainer>
        </Row>
      </Panel>
    </Collapse>
    </StyledCardWrapper>
  );
};

export default ProjectInformation;
