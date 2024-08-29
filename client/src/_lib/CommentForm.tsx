import React, { useCallback, useState } from 'react'
import { 
   StyledAttachButton,
   StyledAttachContainer, 
   StyledCommentButtonContainer, 
   StyledCommentContainer, 
   StyledCommentWrapper, 
   StyledDateText, 
   StyledTextArea } from './index.styled'
import { StyledUserIcon } from './StyledComponents'
import { Form, Row } from 'antd'
import ContainerButton from './ContainerButton'
import { commentType } from 'interfaces'
interface IProps{
  onAddComment: (comment: commentType| null) => void;
  loading: boolean;
  editedComment: commentType | null;
  statusMode: string;
}

const initialData:commentType = {
  description: ""
}

const CommentForm:React.FC<IProps> = ({ onAddComment, loading, editedComment, statusMode }) => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState<commentType | null>(statusMode === "CreateMode" ? initialData : editedComment);
    const onFocus = useCallback(() => {
        setOpen(prev => !prev)
    }, []);

    const handleValueChange = useCallback((e: any) => {
      setDescription(prev => (
        { ...prev, ...e }
      ));
    },[]);
    const addComment = useCallback(() => {
        onAddComment(description)
    }, [description, onAddComment]);

  return (
    <StyledCommentContainer>
      <StyledUserIcon>MN</StyledUserIcon>
        <StyledCommentWrapper>
         <Row gutter={16}>
            <Form 
             initialValues={description || initialData}
             onValuesChange={handleValueChange}
            >
              <Form.Item
              style={{ width: "100%"}}
                name="description"
                rules={[
                    {
                    required: true,
                    message: 'Type a comment...',
                    },
                ]}
                >
              <StyledTextArea onFocus={onFocus} rows={4} cols={240} placeholder="Please enter comment" />
            </Form.Item>
            </Form>
          </Row>
          {/* {open &&  */}
          <Row gutter={16}>
            <StyledAttachContainer span={12}>
              <StyledAttachButton />
              <StyledDateText>Attach Files</StyledDateText>
            </StyledAttachContainer>
            <StyledCommentButtonContainer span={12}>
              <ContainerButton loading={loading} title="Add Comment" type="primary" size='middle' onClick={addComment} />
              <ContainerButton disabled={loading} title="Cancel" type="dashed" size='middle' />
            </StyledCommentButtonContainer>
          </Row>
         {/* } */}
      </StyledCommentWrapper>
    </StyledCommentContainer>
  )
}

export default CommentForm