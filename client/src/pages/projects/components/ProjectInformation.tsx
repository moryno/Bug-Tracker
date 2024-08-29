import { Col, Collapse, Row } from "antd";
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
                  <StyledStatusDot />
                  <StyledInfoText>Completed</StyledInfoText>
                </StyledStatusWrapper>
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
