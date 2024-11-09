import { message, Tabs, TabsProps } from "antd";
import ProjectInformation from "./ProjectInformation";
import { DetailPage, DescriptionComponent, AppComment, AppLoader } from "_lib";
import ProjectDetailHeader from "./ProjectDetailHeader";
import { useParams } from "react-router-dom";
import { useDeleteRecord, useGetById } from "_hooks";
import { ProjectService } from "_services";
import { DomianEnum } from "_constants";
import { useCallback, useMemo, useState } from "react";
import ProjectBugs from "./ProjectBugs";
import ProjectForm from "./ProjectForm";
import { IProject } from "interfaces";

const queryString = `${DomianEnum.PROJECTS}-comments`

const ProjectDetail = () => {
 const { id } = useParams();
 const { getProject, getProjectComments, createProjectComment, deleteProjectComment, editProjectComment, deleteProject } = ProjectService;
 const deleteRecord = useDeleteRecord(deleteProject, DomianEnum.PROJECTS);
 const { isLoading, data } = useGetById(getProject, DomianEnum.PROJECTS, id);
 const [open, setOpen] = useState(false);

 const showDrawer = useCallback(() => {
   setOpen(true);
 }, []);

 const onClose = useCallback(() => {
   setOpen(false);
 }, []);

 const handleDelete = useCallback(async (project : IProject) => {
  if(!project) return message.warning("Please select a project to delete");
  const recordId  = project.id!
  
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
      label: "Comments",
      children: (
        <AppComment 
          parentId={id!}
          parentIdIdentifier={"projectId"}
          getService={getProjectComments}
          deleteService={deleteProjectComment}
          editService={editProjectComment}
          queryString={queryString}
          createService={createProjectComment}
      />
      ),
    },
    {
      key: "2",
      label: "Bugs",
      children:     
        <ProjectBugs projectId={id!} />,
    },
    
  ]), [createProjectComment, deleteProjectComment, editProjectComment, getProjectComments, id]);

  if(isLoading) return <AppLoader />

  return (
    <DetailPage>
      <ProjectDetailHeader onEdit={showDrawer} project={data?.data} deleteProject={handleDelete}  />
      <DescriptionComponent description={data?.data?.description} />
      <ProjectInformation project={data?.data} />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {open &&
      <ProjectForm 
        key={id}
        open={open} 
        onClose={onClose} 
        editedRecord={data?.data} 
        statusMode={"EditMode"}
      />
    }
    </DetailPage>
  );
};


export default ProjectDetail;
