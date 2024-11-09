import { ReactNode } from "react";
import { Collapse } from "antd";
import { StyledFilterCollapseContainer } from "./StyledComponents";

const { Panel } = Collapse;

interface Iprop{
    title: string;
    onchange: (e: any) => void;
    children: ReactNode
}
const FilterCollapseComponent: React.FC<Iprop> = ({ title, children}) => {
  return (
    <StyledFilterCollapseContainer ghost expandIconPosition="end">
        <Panel key="1" header={title}>{ children }</Panel>
    </StyledFilterCollapseContainer>
  )
}

export default FilterCollapseComponent