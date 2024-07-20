import { Col, Collapse, Row } from 'antd'
import React from 'react'
import { PanelTitle, StyledInfoDivContainer, StyledInfoDivWrapper, StyledInfoLabel, StyledUserWrapper } from '../index.styled';
import { StyledInfoText, StyledUserIcon } from '_lib';


const { Panel } = Collapse;

const ProjectInformation = () => {
  return (
    <Collapse defaultActiveKey={['1']}>
     <Panel header={<PanelTitle>Project Information</PanelTitle>} key="1">
       <Row gutter={16}>
        <StyledInfoDivContainer span={12}>
          <StyledInfoDivWrapper>
            <Col span={12}>
            <StyledInfoLabel>Owner</StyledInfoLabel>
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
             <StyledInfoText>Completed</StyledInfoText>
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
             <StyledInfoText>07-11-2024</StyledInfoText>
            </Col>
          </StyledInfoDivWrapper>
        </StyledInfoDivContainer>
        <StyledInfoDivContainer span={12}>
          <StyledInfoDivWrapper>
            <Col span={12}>
             <StyledInfoLabel>End Date</StyledInfoLabel>
            </Col>
            <Col span={12}>
             <StyledInfoText>07-31-2024</StyledInfoText>
            </Col>
          </StyledInfoDivWrapper>
        </StyledInfoDivContainer>
       </Row>
     </Panel>
</Collapse>
  )
}

export default ProjectInformation