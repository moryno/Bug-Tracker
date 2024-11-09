import { useCreateService, useDeleteRecord, useGetById } from "_hooks";
import { message } from "antd";
import { AxiosResponse } from "axios";
import { commentType } from "interfaces";
import { createContext, useState, ReactNode, useCallback } from "react";

interface Iprops {
    parentId: string | number;
    parentIdIdentifier: string;
    getService: (id: string) => Promise<AxiosResponse<any, any>>;
    deleteService: (id: string) => Promise<AxiosResponse<any, any>>;
    editService: (comment: commentType) => Promise<AxiosResponse<any, any>>;
    createService: (comment: commentType) => Promise<AxiosResponse<any, any>>;
    queryString: string;
    children : JSX.Element | ReactNode
}

type contextType = {
    onAddComment: () => Promise<boolean | undefined>; 
    onDelete: (id: string) => Promise<void>; 
    onEditChange: (comment: commentType) => void;
    handleChange: (comment: string) => void;
    isLoading: boolean;
    comments: any;
    commentLoading: boolean; 
    editedComment: commentType | null; 
    statusMode: string;
    comment?: string;
}
const defaultContext: contextType = {
    onAddComment: async () => false,
    onDelete: async () => {},
    handleChange: async () => {},
    onEditChange: () => {},
    isLoading: false,
    comments: [],
    commentLoading: false,
    editedComment: null,
    statusMode: "CreateMode", 
    comment: "",
  };
  
export const CommentContext = createContext<contextType>(defaultContext);

export const CommentContextProvider = ({ 
    children, 
    createService, 
    editService, 
    getService, 
    parentId, 
    parentIdIdentifier,
    queryString, 
    deleteService
 } : Iprops) =>
 {
    const [statusMode, setStatusMode] = useState("CreateMode");
    const [editedComment, setEditedComment] = useState<commentType | null>(null);
    const [comment, setComment] = useState("");
    const { isLoading, data: comments, refetch } = useGetById(getService, queryString, parentId);
    const [commentLoading, setCommentLoading] = useState(false);
    const creatComment = useCreateService(createService, queryString);
    const editComment = useCreateService(editService, queryString);
    const deleteComment = useDeleteRecord(deleteService, queryString);

    const handleChange = (comment: string) => {
        setComment(comment)
    };
    const onEditChange = (comment: commentType) => {
        setEditedComment({
          description: comment.description,
          id: comment.id,
        });
        setComment(comment.description)
        setStatusMode("EditMode")
    };
    
    const refetchComment = useCallback(() => {
        refetch()
      }, [refetch])
    
    const onAddComment = useCallback(async () => {
      if(!comment) return message.warning("No comment to submit.");
    
       setCommentLoading(true);
    
      try {
        if(statusMode === "CreateMode"){
          const params = {
            [parentIdIdentifier]: parentId,
            description: comment
            }
          await creatComment.mutateAsync(params)
        }else{
          const params = {
            [parentIdIdentifier]: parentId,
            description: comment,
            id: editedComment!.id
          }
          await editComment.mutateAsync(params)
        }
        refetchComment()
        setCommentLoading(false);
        setStatusMode("CreateMode");
        setEditedComment(null)
        setComment("")
      } catch (error) {
        setCommentLoading(false);
        console.log(error)
      }
     }, [comment, creatComment, editComment, editedComment, parentId, parentIdIdentifier, refetchComment, statusMode]);

     const onDelete = useCallback(async (id: string) => {
        if(id){
          try {
            await deleteComment.mutateAsync(id);
            refetchComment()
          } catch (error) {
            console.log(error)
          }
        }
      }, [deleteComment, refetchComment]);

return (
    <CommentContext.Provider 
      value={{
        onAddComment,
        onEditChange,
        isLoading,
        comments,
        commentLoading,
        editedComment,
        onDelete,
        statusMode,
        comment,
        handleChange
      }}
    >
        { children }
    </CommentContext.Provider>
)

}