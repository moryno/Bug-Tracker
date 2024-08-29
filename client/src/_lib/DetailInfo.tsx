import { defaultTheme } from "_constants"
import moment from "moment"
import styled from "styled-components"

const DetailInfo = ({ info, isOwner=false } : { info: any, isOwner?: boolean }) => {
  return (
    <StyledInfoContainer>
        {isOwner &&
        <StyledInfo>
            <StlyedInfoLabel>Owner</StlyedInfoLabel>
            <StyledinfoText>{ info?.fullName}</StyledinfoText>
        </StyledInfo>
        }
        <StyledInfo>
            <StlyedInfoLabel>Created By</StlyedInfoLabel>
            <StyledinfoText>{ info?.createdUser }</StyledinfoText>
        </StyledInfo>
        <StyledInfo>
            <StlyedInfoLabel>Created Time</StlyedInfoLabel>
            <StyledinfoText>{ moment(info?.createdDate).format('D-MM-YYYY h:mm:ss a') }</StyledinfoText>
        </StyledInfo>
        <StyledInfo>
            <StlyedInfoLabel>Last Modified By</StlyedInfoLabel>
            <StyledinfoText>{ info?.updatedUser }</StyledinfoText>
        </StyledInfo>
        <StyledInfo>
            <StlyedInfoLabel>Last Modified Time</StlyedInfoLabel>
            <StyledinfoText>{ moment(info?.updatedDate).format('D-MM-YYYY h:mm:ss a') }</StyledinfoText>
        </StyledInfo>
    </StyledInfoContainer>
  )
}

const StyledInfoContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px
`
const StyledInfo = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`
const StlyedInfoLabel = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${defaultTheme.theme.palette.gray[400]};
`
const StyledinfoText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[500]};
`
export default DetailInfo