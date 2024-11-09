import { CommentContextProvider } from "_context";
import Comment from "_lib/Comment";
import CommentForm from "_lib/CommentForm";
import { Card, Divider } from "antd";
import { AxiosResponse } from "axios";
import { commentType } from "interfaces";

interface Iprops {
    parentId: string | number;
    parentIdIdentifier: string;
    getService: (id: string) => Promise<AxiosResponse<any, any>>;
    deleteService: (id: string) => Promise<AxiosResponse<any, any>>;
    editService: (comment: commentType) => Promise<AxiosResponse<any, any>>;
    createService: (comment: commentType) => Promise<AxiosResponse<any, any>>;
    queryString: string
  }

const AppComment: React.FC<Iprops> = ({ createService, editService, getService, parentId, parentIdIdentifier, queryString, deleteService }) => { 
      
  return (
  <CommentContextProvider
      getService={getService}
      deleteService={deleteService}
      editService={editService}
      createService={createService}
      queryString={queryString} 
      parentId={parentId} 
      parentIdIdentifier={parentIdIdentifier}
    >
    <Card>
      <Comment />
      <Divider />
      <CommentForm />
    </Card>
    </CommentContextProvider>
  )
}

export default AppComment