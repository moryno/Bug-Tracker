import { PanelTitle, StyledCardWrapper, StyledComment } from "./StyledComponents";
import { Collapse } from "antd";

const { Panel } = Collapse;

const DescriptionComponent = ({ description }: { description: string }) => {
  return (
    <StyledCardWrapper>
      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel header={<PanelTitle>Description</PanelTitle>} key="1">
          <StyledComment>{description}</StyledComment>
        </Panel>
      </Collapse>
    </StyledCardWrapper>
  );
};

export default DescriptionComponent;
