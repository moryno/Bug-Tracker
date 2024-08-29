import { Popover } from "antd"
import DetailInfo from "./DetailInfo"
import { StyledInfo } from "./index.styled"
import { IBug, IProject } from "interfaces"

const DetailInfoPopover = ({ info, isOwner=false } : { info:IBug | IProject, isOwner?: boolean }) => {
  return (
 <Popover
    key={Math.random()}
    title={null}
    content={
      <>
        <DetailInfo info={info} isOwner={isOwner} />
      </>
    }
  >
    <style>
      {`

        .ant-badge-count {
            pointer-events: none;
        }
        `}
    </style>
    <StyledInfo />
  </Popover>
  )
}

export default DetailInfoPopover