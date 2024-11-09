import { StyledAuthContainerContent, StyledAuthFormTitle } from "_lib/Auth/AuthContainer/index.style"
import { StyledDemoInfoText, StyledDemoUserinfoContainer, StyledDemoUserWrapper } from "_lib/StyledComponents"
import { Modal } from "antd"
import { useCallback } from "react"
import { FaUser, FaUserCog, FaUserEdit } from "react-icons/fa"
import { FaBug, FaChalkboardUser } from "react-icons/fa6"

const AppDemoLogin = ({ open, onClose } : { open: boolean, onClose : () => void }) => {
    const handleDemoLogin = useCallback((type: string) => {},[])
  return (
    <Modal
        title=""
        open={open}
        footer={false}
        onCancel={onClose}
        destroyOnClose
        centered
        closable={false}
    >
        <>
            <StyledAuthContainerContent>
                <FaBug size={22} />
               <StyledAuthFormTitle >Bug Tracker Demo Login</StyledAuthFormTitle>
            </StyledAuthContainerContent>
            <StyledDemoUserWrapper>
              <StyledDemoUserinfoContainer onClick={() => handleDemoLogin("Admin")}>
                  <FaUserCog size={50} />
                  <StyledDemoInfoText>Admin</StyledDemoInfoText>
              </StyledDemoUserinfoContainer>
              <StyledDemoUserinfoContainer onClick={() => handleDemoLogin("Project Manager")}>
              <FaChalkboardUser size={50} color="#F56B62" />
                  <StyledDemoInfoText color={"cancelled"}>Project Manager</StyledDemoInfoText>
                  </StyledDemoUserinfoContainer>
              <StyledDemoUserinfoContainer onClick={() => handleDemoLogin("Developer")}>
              <FaUserEdit size={50} color="#2CC8BA" />
                  <StyledDemoInfoText color="active">Developer</StyledDemoInfoText>
                  </StyledDemoUserinfoContainer>
              <StyledDemoUserinfoContainer onClick={() => handleDemoLogin("Member")}>
              <FaUser size={50} color="#08AEEA" />
                  <StyledDemoInfoText color="inProgress">Member</StyledDemoInfoText>
                  </StyledDemoUserinfoContainer>
            </StyledDemoUserWrapper>
        </>
    </Modal>
  
  )
}

export default AppDemoLogin