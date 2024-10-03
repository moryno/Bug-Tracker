import { Badge, Popover, Table } from "antd"
import { StyledAssigneeContainer, StyledAssigneeImage, StyledAssigneeName } from "pages/bugs/index.styled"
import styled from "styled-components"

const PopoverComponent = ({ dataSource, columns}: any) => {
  return (
<Popover
    key={Math.random()}
    title={null}
    content={
      <>
        <Table
          dataSource={dataSource}
          columns={columns}
          size='small'
          bordered
          pagination={false}
          rowKey={Math.random()}
        />
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
    <StyledDiv>
      <StyledAssigneeContainer key={dataSource[0]?.userName}>
        <StyledAssigneeImage src={dataSource[0]?.image || "/img/noavatar.jpg"} alt={dataSource[0]?.fullName} />
        <StyledAssigneeName>{dataSource[0]?.fullName}</StyledAssigneeName>
       </StyledAssigneeContainer>
    <Badge
      title=''
      showZero
      count={dataSource.length}
      style={{ backgroundColor: '#2CC8BA' }}
    />
    </StyledDiv>
  </Popover>
  )
}

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`
export default PopoverComponent