import { DomianEnum } from "_constants";
import { useGetById } from "_hooks";
import { StyledTable, StyledTableCardWrapper } from "_lib";
import { BugService } from "_services";
import { userColumns } from "../columns";

const BugAssignees = ({ bugId } : { bugId : string }) => {
    const { getBugAssinees } = BugService;
    const { isLoading: bugsLoading, data: projectBugs } = useGetById(getBugAssinees, `${DomianEnum.BUGS}-assignees`, bugId);

  return (
    <StyledTableCardWrapper>
        <StyledTable 
        loading={bugsLoading} 
        dataSource={projectBugs?.data || []} 
        columns={userColumns} 
        rowKey={(record: any) => record?.id}
        onRow={(record: any, rowIndex) => {
        return {

            onContextMenu: (event) => {},
        };
        }}
        />
    </StyledTableCardWrapper>
  )
}

export default BugAssignees