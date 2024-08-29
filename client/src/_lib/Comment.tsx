import { commentType, IComment } from 'interfaces'
import { StyledComment, StyledInfoText, StyledUserIcon } from './StyledComponents'
import {  StyledCommentContainer, StyledDateContainer, StyledDateText, StyledEditText, StyledDot, StyledUserContainer } from './index.styled'
import { useCallback } from 'react';
import { useAuthUser, useDeleteRecord } from '_hooks';
import { AxiosResponse } from 'axios';

interface IProps{
  comments: IComment[];
  loading: boolean;
  deleteService: (id: string) => Promise<AxiosResponse<any, any>>;
  queryString: string;
  onEditChange: (comment: commentType) => void;
}

const Comment = ({ comments, deleteService, queryString, onEditChange } : IProps) => {
  const deleteComment = useDeleteRecord(deleteService, queryString);
  const { user } = useAuthUser();
  console.log(comments)
  const onDelete = useCallback(async (id: string) => {
    if(id){
      try {
        await deleteComment.mutateAsync(id)
      } catch (error) {
        console.log(error)
      }
    }
  }, [deleteComment]);

  return <>
    { comments?.map(comment => 
      <StyledCommentContainer key={comment?.id}>
      <StyledUserIcon>MN</StyledUserIcon>
      <StyledUserContainer>
        <StyledInfoText>{ comment?.fullName }</StyledInfoText>
        <StyledComment>{ comment?.description }</StyledComment>
        <StyledDateContainer>
          <StyledDateText>Today</StyledDateText>
          <StyledDateText>@</StyledDateText>
          <StyledDateText>03:30 PM</StyledDateText>
          {user?.userName === comment?.userName &&
          <>
          <StyledDot />
          <StyledEditText onClick={() => onEditChange({description: comment.description, id: comment?.id})}>Edit</StyledEditText>
          <StyledDot />
          <StyledEditText onClick={() => onDelete(comment.id)}>Delete</StyledEditText>
          </>
        }
        </StyledDateContainer>
      </StyledUserContainer>
    </StyledCommentContainer>
    )}
    </>
}

export default Comment