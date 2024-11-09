import { IComment } from 'interfaces'
import { StyledComment, StyledInfoText, StyledUserIcon } from './StyledComponents'
import {  StyledCommentContainer, StyledDateContainer, StyledDateText, StyledEditText, StyledDot, StyledUserContainer } from './index.styled'
import { useContext } from 'react';
import { useAuthUser } from '_hooks';
import { formatTodayDate, getAbbreviation } from '_helpers';
import { CommentContext } from '_context';
import DOMPurify from "dompurify"


const Comment = () => {
  const { comments, onDelete, onEditChange } = useContext(CommentContext)
  const { user } = useAuthUser();

  return <>
    { comments?.data?.map((comment: IComment) => 
      <StyledCommentContainer key={comment?.id}>
      <StyledUserIcon>{getAbbreviation(comment?.fullName!)}</StyledUserIcon>
      <StyledUserContainer>
        <StyledInfoText>{ comment?.fullName }</StyledInfoText>
        <StyledComment dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment?.description ) }} />
        <StyledDateContainer>
          <StyledDateText>{formatTodayDate(comment.createdAt!)}</StyledDateText>
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