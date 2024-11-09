import { Tooltip } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import { ReactNode } from "react";

interface IProp{
    title: string;
    color?: string;
    placement?: TooltipPlacement;
    children: ReactNode
}
const ContainerTooltip: React.FC<IProp> = ({ children, title, color = "#12CC1B", placement = "bottom"}) => {
  return (
    <Tooltip
      title={title} 
      placement={placement} 
      color={color}>
        { children }
    </Tooltip>
  )
}

export default ContainerTooltip