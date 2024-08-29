import { Card, Divider, message, Tabs, TabsProps } from "antd";
import ProjectInformation from "./ProjectInformation";
import { Comment, CommentForm, DetailPage, DescriptionComponent } from "_lib";
import ProjectDetailHeader from "./ProjectDetailHeader";
import { useParams } from "react-router-dom";
import { useCreateService, useGetById } from "_hooks";
import { ProjectService } from "_services";
import { DomianEnum } from "_constants";
import { useCallback, useMemo, useState } from "react";
import { commentType } from "interfaces";

const queryString = `${DomianEnum.PROJECTS}-comments`

const ProjectDetail = () => {
 const { id } = useParams();
 const { getProject, getProjectComments, createProjectComment, deleteProjectComment, editProjectComment} = ProjectService;
 const [editedComment, setEditedComment] = useState<commentType | null>(null);
 const [statusMode, setStatusMode] = useState("CreateMode");
 const { isLoading, data } = useGetById(getProject, DomianEnum.PROJECTS, id);
 const { isLoading: loading, data: comments, refetch } = useGetById(getProjectComments, queryString, id);
 const [commentLoading, setCommentLoading] = useState(false)
 const creatComment = useCreateService(createProjectComment, queryString);
 const editComment = useCreateService(editProjectComment, queryString);

  const onChange = (key: string) => {
    console.log(key);
  };
  const onEditChange = (comment: commentType) => {
    setEditedComment({
      description: comment.description,
      id: comment.id,
    });
    setStatusMode("EditMode")
  };

 const onAddComment = useCallback(async (comment: commentType | null) => {
  if(!comment) return message.warning("No comment to submit.");

   setCommentLoading(true);
 
  try {
    if(statusMode === "CreateMode"){
      const params = {
        projectId: id,
        description: comment.description
        }
      await creatComment.mutateAsync(params)
     }
     else{
      const params = {
        projectId: id,
        description: comment.description,
        id: comment.id
      }
      await editComment.mutateAsync(params)
     }
     refetch()
     setCommentLoading(false);
     setStatusMode("CreateMode");
     setEditedComment(null)
  } catch (error) {
    setCommentLoading(false);
    console.log(error)
  }
 }, [creatComment, editComment, id, refetch, statusMode]);


  const items: TabsProps["items"] = useMemo(() => ([
    {
      key: "1",
      label: "Comments",
      children: (
        <Card>
          <Comment 
            comments={comments?.data}
            loading={loading}
            deleteService={deleteProjectComment}
            queryString={queryString}
            onEditChange={onEditChange}
           />
           <Divider />
          <CommentForm 
            key={statusMode && editedComment?.id}
            onAddComment={onAddComment}
            loading={commentLoading}
            editedComment={editedComment}
            statusMode={statusMode}
           />
        </Card>
      ),
    },
    {
      key: "2",
      label: "Bugs",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ]), [commentLoading, comments?.data, deleteProjectComment, editedComment, loading, onAddComment, statusMode]);

  if(isLoading) return <p>Loading...</p>

  return (
    <DetailPage>
      <ProjectDetailHeader project={data?.data} />
      <DescriptionComponent description={data?.data?.description} />
      <ProjectInformation project={data?.data} />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </DetailPage>
  );
};


export default ProjectDetail;
