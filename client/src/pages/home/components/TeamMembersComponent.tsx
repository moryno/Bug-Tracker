import { StyledAssigneeImage } from 'pages/projects/index.styled';
import { 
    StyledChartCardHeaderImg, 
    StyledChartCardHeaderTitle, 
    StyledChartCardHeaderWrapper, 
    StyledMiddleChartCardWrapper, 
    StyledWorkItemInfoDesc, 
    StyledWorkItemInfoTitle, 
    StyledWorkItemInfoWrapper, 
    StyledWorkItemLeftDiv, 
    StyledWorkItemMailIcon, 
    StyledWorkItemProfileIcon, 
    StyledWorkItemRightDiv, 
    StyledWorkItemWrapper 
} from '../index.styled';
import { IUser } from 'interfaces';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { PROFILE_ROUTE, USER_ROUTE } from '_constants';
import { EmailContainer } from '_lib';
import { useAuthUser } from '_hooks';

export const TeamMembersComponent = ({ team} : { team : IUser[]}) => {
    const { user: currentUser } = useAuthUser();
    const navigate = useNavigate();
    const [lastClickTime, setLastClickTime] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

    const onRowClick = useCallback((record: IUser) => {
        const currentTime = new Date().getTime();
        const timeSinceLastClick = currentTime - lastClickTime;

        if (record && timeSinceLastClick < 300) {
            navigate(`${PROFILE_ROUTE}/${record.userName}`)
          }
      
          setLastClickTime(currentTime);

    }, [lastClickTime, navigate])

    const viewProfile = useCallback((record: IUser) => {

        if (record) {
            navigate(`${PROFILE_ROUTE}/${record.userName}`)
          }
      
    }, [navigate])


    const sendMailToMember = useCallback((user: IUser) => {
        if(user.email){
            setOpen(true);
            setSelectedEmail(user.email)
        }

    }, [])
    const closeModal = useCallback(() => {
        setOpen(false);
        setSelectedEmail(null)
    }, [])
      
    const handleNavigate = useCallback(() => {
          navigate(USER_ROUTE)
      }, [navigate])

  return (
    <StyledMiddleChartCardWrapper className='scrollbar-hide'>
    <StyledChartCardHeaderWrapper className='mb-2'>
     <StyledChartCardHeaderTitle>Team</StyledChartCardHeaderTitle>
      <StyledChartCardHeaderImg onClick={handleNavigate} src="/img/moreDark.png" alt="this is an elipses" />
    </StyledChartCardHeaderWrapper> 
    { team && team?.map(( user : any) => (
        <StyledWorkItemWrapper onClick={() => onRowClick(user)} key={user?.id}>
            <StyledWorkItemLeftDiv>
                <StyledAssigneeImage src={ user?.image || "/img/noavatar.jpg" } />
                <StyledWorkItemInfoWrapper>
                    <StyledWorkItemInfoTitle>{ user?.fullName }</StyledWorkItemInfoTitle>
                    <StyledWorkItemInfoDesc>{ user?.roles?.join(", ") }</StyledWorkItemInfoDesc>
                </StyledWorkItemInfoWrapper>
            </StyledWorkItemLeftDiv>
            <StyledWorkItemRightDiv>
                <StyledWorkItemProfileIcon onClick={() => viewProfile(user)} />
               {user?.userName !== currentUser?.userName &&
                <StyledWorkItemMailIcon onClick={() => sendMailToMember(user)} />
               }
            </StyledWorkItemRightDiv>
        </StyledWorkItemWrapper>
    ))}
    {
    open &&
    <EmailContainer 
        open={open} 
        onClose={closeModal} 
        recipientEmail={selectedEmail}
     />
    }
   </StyledMiddleChartCardWrapper>
  )
}
