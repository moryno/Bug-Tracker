import  { useCallback, useContext } from 'react'
import "react-quill/dist/quill.snow.css"
import { 
   StyledAttachButton,
   StyledAttachContainer, 
   StyledCommentButtonContainer, 
   StyledCommentContainer, 
   StyledCommentWrapper, 
 } from './index.styled'
import { StyledTextEditorContainer, StyledUserIcon } from './StyledComponents'
import { Row } from 'antd'
import ContainerButton from './ContainerButton'
import { useAuthUser } from '_hooks'
import { getAbbreviation } from '_helpers'
import { CommentContext } from '_context'
import ReactQuill from 'react-quill'


const CommentForm = () => {
  const { onAddComment, isLoading, comment, handleChange } = useContext(CommentContext)
  const { user } = useAuthUser();
    // const [open, setOpen] = useState(false);
    const onFocus = useCallback(() => {
        // setOpen(prev => !prev)
    }, []);

    const addComment = useCallback(() => {
        onAddComment()
    }, [onAddComment]);

  return (
    <StyledCommentContainer>
      <StyledUserIcon>{getAbbreviation(user?.fullName!)}</StyledUserIcon>
        <StyledCommentWrapper>
         <Row>
            <StyledTextEditorContainer >
            <ReactQuill placeholder='Please enter comment' theme="snow" onChange={handleChange} value={comment} />
            </StyledTextEditorContainer>
          </Row>
          {/* {open &&  */}
          <Row gutter={16}>
            <StyledAttachContainer span={6}>
              <StyledAttachButton />
              {/* <StyledDateText>Attach Files</StyledDateText> */}
            </StyledAttachContainer>
            <StyledCommentButtonContainer span={18}>
              <ContainerButton loading={isLoading} title="Add Comment" type="primary" size='middle' onClick={addComment} />
              <ContainerButton disabled={isLoading} title="Cancel" type="dashed" size='middle' />
            </StyledCommentButtonContainer>
          </Row>
         {/* } */}
      </StyledCommentWrapper>
    </StyledCommentContainer>
  )
}

export default CommentForm