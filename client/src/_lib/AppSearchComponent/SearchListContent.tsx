import { useCallback } from "react"
import { Divider, Tag } from "antd"
import {
     StyledContentExtra, 
     StyledContentMain,
     StyledContentText, 
     StyledContentTitleText, 
     StyledCountPreviewText, 
     StyledEventIcon, 
     StyledInfoImage, 
     StyledSearchBugIcon,
     StyledSearchContentContainer, 
     StyledSearchInfoContent, 
     StyledSearchProjectIcon, 
     StyledSearcInfoContainer, 
     StyledSearcInfoHeaderContainer,
     StyleInfoOwner, 
     StyleInfoPeriodText
     } from "./index.styled"
import { StyledAssigneeContainer } from "pages/projects/index.styled"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import ContainerTooltip from "_lib/ContainerTooltip"


const SearchListContent = ({ groupedResults } : { groupedResults : any[]}) => {
    const navigate = useNavigate();

    const onNavigation = useCallback((id: string) => {
        navigate(id)
    }, [navigate])
    
  return (
    <>{groupedResults?.map(result => {
    const status = result?.currentStatus 
    const bugStatus = result?.bugStatus
    const priority = result?.priority
    const severity =result?.severity
    const title = result?.projectName || result?.bugName || result?.title
    const classification = result?.classification
    const description = result?.description || result?.initialComment 
    const date = result?.createdDate || result?.startDate

    return (
         <StyledSearcInfoContainer 
            key={result?.id} 
            onClick={() => onNavigation(`${status ? `projects/${result?.id}` : bugStatus ? `bugs/${result?.id}` : `events`}`)}
        >
        <StyledSearcInfoHeaderContainer>
            <StyledSearchInfoContent>
               {
                 bugStatus ? 
                 <StyledSearchBugIcon /> : 
                 status ? <StyledSearchProjectIcon /> :  
                 <StyledEventIcon />
               }
                <StyleInfoPeriodText>
                    {bugStatus ? "Bug" : status ? "Project" : "Event"}
                </StyleInfoPeriodText>
                <Divider type="vertical" />
                <StyledAssigneeContainer>
            <StyledInfoImage src={result?.image || "/img/noavatar.jpg"} alt={result?.fullName} />
            <StyleInfoOwner>{result?.fullName || "Not Assigned"}</StyleInfoOwner>
            </StyledAssigneeContainer>
            </StyledSearchInfoContent>
            <StyleInfoPeriodText>{moment(date).format("ddd MMM DD HH:mm")}</StyleInfoPeriodText>
        </StyledSearcInfoHeaderContainer>
        <StyledSearchContentContainer>
            <StyledContentMain>
                <StyledContentTitleText>{title}</StyledContentTitleText>
                <StyledContentText>{description?.substring(0, 180)}...</StyledContentText>
            </StyledContentMain>
            <StyledContentExtra>
                 {status &&
                <Tag color={`${
                        status === "Delayed"  ? "#C5A070" : status === "Active" ? "#2CC8BA" : status === "InProgress" ? "#08AEEA" : status === "OnTrack" ? "#74CB80" : status === "InTesting" ? "#F6A96D" : "#FBC11E"
                    }`}
                   >{status}
                </Tag>
                }
                {bugStatus &&
                <Tag color={`${bugStatus === "Open" ? "#2CC8BA" : bugStatus === "InProgress" ? "#08AEEA" : "#4ED3E5"}`}>{bugStatus}</Tag> 
                }
                {severity &&
                <Tag color={`${severity === "Minor" ? "#2CC8BA" : severity === "Major" ? "#08AEEA" : severity === "Critical" ? "#FFBB28" : "#EF476F"}`}>{severity}</Tag>
                }
                {priority &&
                <Tag
                   color={`${priority === "High" ? "#EF476F" : priority === "Low" ? "#2CC8BA" : "#08AEEA"}`}
                >{priority}
                </Tag>
                }
                {classification && 
                <Tag color="#2CC8BA">{classification}</Tag>
                }
                <ContainerTooltip title={`${status ? "Bugs" : bugStatus ? "Assignees" : "Attendees"}`}>
                    <StyledCountPreviewText>{result?.count}</StyledCountPreviewText>
                </ContainerTooltip>
            </StyledContentExtra>
        </StyledSearchContentContainer>
    </StyledSearcInfoContainer>
    )
}
)  
}
</> 
  )
}

export default SearchListContent