import React from 'react'
import { StyledComment, StyledInfoText, StyledUserIcon } from './StyledComponents'

import {  StyledCommentContainer, StyledDateContainer, StyledDateText, StyledEditText, StyledDot, StyledUserContainer } from './index.styled'

const Comment = () => {
  return (
    <StyledCommentContainer>
      <StyledUserIcon>MN</StyledUserIcon>
      <StyledUserContainer>
        <StyledInfoText>Maurice Nganga</StyledInfoText>
        <StyledComment>DASSFDGH,HFAHGEGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG</StyledComment>
        <StyledDateContainer>
          <StyledDateText>Today</StyledDateText>
          <StyledDateText>@</StyledDateText>
          <StyledDateText>03:30 PM</StyledDateText>
          <StyledDot />
          <StyledEditText>Edit</StyledEditText>
          <StyledDot />
          <StyledEditText>Delete</StyledEditText>
        </StyledDateContainer>
      </StyledUserContainer>
    </StyledCommentContainer>
  )
}

export default Comment