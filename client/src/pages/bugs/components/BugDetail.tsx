import { Card, Divider, message, Tabs, TabsProps } from "antd";
import { Comment, CommentForm, DetailPage, DescriptionComponent } from "_lib";
import BugDetailHeader from "./BugDetailHeader";
import BugInformation from "./BugInformation";
import BugStatusComponent from "./BugStatusComponent";
import { useCreateService, useGetById } from "_hooks";
import { BugService } from "_services";
import { DomianEnum } from "_constants";
import { useParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { commentType } from "interfaces";

const queryString = `${DomianEnum.BUGS}-comments`

const BugDetail = () => {
  const { id } = useParams();
  const { getBug, getBugComments, createBugComment, deleteBugComment, editBugComment} = BugService;
  const [editedComment, setEditedComment] = useState<commentType | null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const { isLoading, data } = useGetById(getBug, DomianEnum.BUGS, id);
  const { isLoading: loading, data: comments, refetch } = useGetById(getBugComments, queryString, id);
  const [commentLoading, setCommentLoading] = useState(false)
  const creatComment = useCreateService(createBugComment, queryString);
  const editComment = useCreateService(editBugComment, queryString);


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
        bugId: id,
        description: comment.description
        }
      await creatComment.mutateAsync(params)
    }else{
      const params = {
        bugId: id,
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
            deleteService={deleteBugComment}
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
  ]), [commentLoading, comments?.data, deleteBugComment, editedComment, loading, onAddComment, statusMode]);

  if(isLoading) return <p>Loading...</p>
  
  return (
    <DetailPage>
      <BugDetailHeader bug={data?.data} />
      <BugStatusComponent status={data?.data?.bugStatus} />
      <DescriptionComponent description={data?.data?.description} />
      <BugInformation bug={data?.data}  />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </DetailPage>
  );
};


export default BugDetail;
