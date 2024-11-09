import { useState } from 'react'
import { Popover, Spin } from 'antd'
import { StyledAssigneeImage } from 'pages/bugs/index.styled'
import { 
  StyledWorkItemInfoDesc, 
  StyledWorkItemInfoTitle, 
  StyledWorkItemInfoWrapper, 
  StyledWorkItemLeftDiv, 
  StyledWorkItemWrapper
 } from 'pages/home/index.styled'
import NotificationDetails from './NotificationDetails'
import MediumDrawer from '_lib/MediumDrawer'
import { StyledAppDrawerText, StyledAppDrawerTitleWrapper, StyledAppNotificationWrapper } from './index.styled'
import { INotification } from 'interfaces'
import moment from 'moment'
import {  useDispatch, useSelector } from 'react-redux'
import { RootState } from '_redux'
import { NotificationService } from '_services'
import { useAuthUser } from '_hooks'
import { loadNotifications } from '_redux/actions/notification.action'


const AppNotification = ({ open, onClose } : { open: boolean, onClose: () => void }) => {
  const { user } = useAuthUser();
  const [parentId, setParentId] = useState<string | null>(null);
  const [selectedNotification, setNotification] = useState<INotification | null>(null);
  const [clicked, setClicked] = useState(false);
  const { notifications, isFetching } = useSelector((store: RootState) => store.notification);
  const dispatch = useDispatch();
  // loadNotifications

  const handleSelected = (notification: INotification) => {

      if(notification?.eventId){
        setClicked(true)
        setParentId(notification?.eventId);
        setNotification(notification)

        markNotificationAsRead(notification.id!)
      }
      
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await NotificationService.markAsRead({ id: notificationId })
    } catch (error) {
      console.log(error)
    }
  };

 const handleClickChange = (open: boolean) => {
  if(!open){
    setParentId(null);
    setNotification(null)
  }
    setClicked(open);
    
  };

  const reload = () => {
    onClose()
    loadNotifications(dispatch, user?.userName!)
  }

  const markAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead()
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <MediumDrawer
    onClose={reload} 
    open={open} 
    title={
      <StyledAppDrawerTitleWrapper>
        <span>All Notifications</span>
        <StyledAppDrawerText onClick={markAllAsRead}>Mark all as done</StyledAppDrawerText>
      </StyledAppDrawerTitleWrapper>
    } 
    width={450}
    footer={false}
  >
     
    <StyledAppNotificationWrapper className='scrollbar-hide'>
    {isFetching ? <Spin /> : 
     <Popover
      placement="left" 
      trigger="click"
      arrow={false}
      open={clicked}
      onOpenChange={handleClickChange}
      content={<NotificationDetails parentId={parentId!} organizerName={selectedNotification?.senderName} />}
      >
        {notifications?.map((notification : INotification) => (
            <StyledWorkItemWrapper className={`${ notification.id === selectedNotification?.id ? "clicked" : "" }`} key={notification?.id} onClick={() => handleSelected(notification)}>
              <StyledWorkItemLeftDiv>
                    <StyledAssigneeImage src={notification?.senderImage || "/img/noavatar.jpg" } />
                    <StyledWorkItemInfoWrapper>
                        <StyledWorkItemInfoTitle>Event: {notification?.message}</StyledWorkItemInfoTitle>
                        <StyledWorkItemInfoDesc>{`${moment(notification?.eventStartDate).format("MMMM DD")}, ${notification?.senderEmail}`}</StyledWorkItemInfoDesc>
                    </StyledWorkItemInfoWrapper>
                </StyledWorkItemLeftDiv> 
            </StyledWorkItemWrapper>
        ))}
      </Popover>
     }
    </StyledAppNotificationWrapper>
  </MediumDrawer>
  )
}

export default AppNotification