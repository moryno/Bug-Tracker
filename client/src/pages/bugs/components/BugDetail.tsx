import { message, Tabs, TabsProps } from "antd";
import { DetailPage, DescriptionComponent, AppComment, AppLoader } from "_lib";
import BugDetailHeader from "./BugDetailHeader";
import BugInformation from "./BugInformation";
import BugStatusComponent from "./BugStatusComponent";
import { useDeleteRecord, useGetById } from "_hooks";
import { BugService } from "_services";
import { DomianEnum } from "_constants";
import { useParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { IBug } from "interfaces";
import BugForm from "./BugForm";
import BugAssignees from "./BugAssignees";

const queryString = `${DomianEnum.BUGS}-comments`

const BugDetail = () => {
  const { id } = useParams();
  const { getBug, getBugComments,deleteBug, createBugComment, deleteBugComment, editBugComment } = BugService;
  const deleteRecord = useDeleteRecord(deleteBug, DomianEnum.BUGS);
  const { isLoading, data } = useGetById(getBug, DomianEnum.BUGS, id);
  const [open, setOpen] = useState(false);

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    // setSelectedRecord(null);
    // setStatusMode("CreateMode")
  }, []);

  const handleDelete = useCallback(async (bug : IBug) => {
    if(!bug) return message.warning("Please select a bug to delete");
    const recordId  = bug.id!
    
    try {
      await deleteRecord.mutateAsync(recordId)
    } catch (error) {
      console.log(error);
    }
  }, [deleteRecord]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = useMemo(() => ([
    {
      key: "1",
      label: `Comments`,
      children: (
        <AppComment 
          parentId={id!}
          parentIdIdentifier={"bugId"}
          getService={getBugComments}
          deleteService={deleteBugComment}
          editService={editBugComment}
          queryString={queryString}
          createService={createBugComment}
        />
      ),
    },
    {
      key: "2",
      label: "Bug Assignees",
      children:     
        <BugAssignees bugId={id!} />,
    },
  ]), [createBugComment, deleteBugComment, editBugComment, getBugComments, id]);

  if(isLoading) return <AppLoader />
  

  return (
    <>
    <DetailPage>
      <BugDetailHeader bug={data?.data} openForm={showDrawer} deletBug={handleDelete} />
      <BugStatusComponent status={data?.data?.bugStatus} />
      <DescriptionComponent description={data?.data?.description} />
      <BugInformation bug={data?.data}  />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </DetailPage>
    {open &&
      <BugForm 
        key={data?.data?.id}
        open={open} 
        onClose={onClose} 
        editedRecord={data?.data} 
        statusMode={"EditMode"}
      />
    }
    </>
  );
};


export default BugDetail;
