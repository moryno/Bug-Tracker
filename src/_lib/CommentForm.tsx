import React, { useCallback, useState } from 'react'
import { StyledAttachButton, StyledAttachContainer, StyledCommentButtonContainer, StyledCommentContainer, StyledCommentWrapper, StyledDateText, StyledTextArea, StyledUserContainer } from './index.styled'
import { StyledUserIcon } from './StyledComponents'
import { Col, Form, Input, Row, Space } from 'antd'
import ContainerButton from './ContainerButton'


const CommentForm = () => {
    const [open, setOpen] = useState(false);
    const onFocus = useCallback(() => {
        setOpen(prev => !prev)
    }, []);

  return (
    <StyledCommentContainer>
      <StyledUserIcon>MN</StyledUserIcon>
        <StyledCommentWrapper>
         <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                rules={[
                    {
                    required: true,
                    message: 'Type a comment...',
                    },
                ]}
                >
              <StyledTextArea onFocus={onFocus} rows={4} placeholder="please enter url description" />
            </Form.Item>
            </Col>
          </Row>
          {open && 
          <Row gutter={16}>
            <StyledAttachContainer span={12}>
              <StyledAttachButton />
              <StyledDateText>Attach Files</StyledDateText>
            </StyledAttachContainer>
            <StyledCommentButtonContainer span={12}>
              <ContainerButton title="Add Comment" type="primary" size='middle' />
              <ContainerButton title="Cancel" type="dashed" size='middle' onClick={onFocus} />
            </StyledCommentButtonContainer>
          </Row>
         }
      </StyledCommentWrapper>
    </StyledCommentContainer>
  )
}

export default CommentForm