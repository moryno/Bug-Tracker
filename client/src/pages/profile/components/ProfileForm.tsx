import { useCallback, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import {  ProfileType, profileType } from "interfaces"
import { DomianEnum } from "_constants";
import { useCreateService, useGetAll } from "_hooks";
import { ContainerButton, ContainerDrawer, PhotoComponent } from "_lib";
import { ProjectService, RoleService } from "_services";
import { Col, Divider, Form, Input, Row, Select } from "antd";
import { StyledHomeHeaderInfoContainer } from "pages/home/index.styled";
import { StyledProfileAvatar, StyledProfileDangerText, StyledProfileHeaderInfoTitle, StyledProfileInfoContainer, StyledProfileRoleText } from "../index.styled";

const { Option } = Select
const initialData: ProfileType = {
  fullName: "",
  email: "",
  userName: "",
}

const ProfileForm:React.FC<profileType>= ({ onClose, open, profile=null }) => {
    const [formData, setFormData] = useState(profile ? profile : initialData);
    const [openModal, setOpenModal] = useState(false);
    const { isLoading: isRolesLoading, data: rolesData } = useGetAll(RoleService.getRoles, `${DomianEnum.ROLES}-profile`);
    
    const [loading, setLoading] = useState(false);
    const createProject = useCreateService(ProjectService.createProject, DomianEnum.PROJECTS);
    const [form] = Form.useForm();
  
    const handleValueChange = useCallback((e: any) => {
 
      setFormData(prev => (
        { ...prev, ...e }
      ));
    },[]);

    const showPhotoModal = useCallback(() => {
      setOpenModal(true)
    },[]);
  
    const closePhotoModal = useCallback(() => {
      setOpenModal(false)
    },[]);
  
    const onClear = useCallback(() => {
      setLoading(false);
      onClose();
      form.resetFields();
    }, [form, onClose]);
  
    const onFinish = useCallback(async () => {
      // if(!formData?.projectName)
      //   return message.warning("Project name is required.");
      // if(!formData?.description)
      //   return message.warning("Project description is required.");
  
     setLoading(true);
      try {
      
        const params = {
          ...formData
        }
          await createProject.mutateAsync(params);
  
        onClear()
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }, [createProject, formData, onClear]);
  return (
    <>
    {openModal &&
      <PhotoComponent visible={openModal} onCancel={closePhotoModal} />
    }
    <ContainerDrawer 
       onFinish={onFinish} 
       onClose={onClear} 
       open={open} 
       loading={loading}
       title="Edit profile"
       width={560}
     >
      <Form 
        form={form}
        initialValues={formData}
        onValuesChange={handleValueChange}
        layout="vertical"
      >
       <Row>
        <StyledHomeHeaderInfoContainer>
           <StyledProfileAvatar src={profile?.image || "/img/noavatar.jpg"} />
         <StyledProfileInfoContainer>
            <StyledProfileHeaderInfoTitle>Profile picture</StyledProfileHeaderInfoTitle>
            <StyledProfileRoleText>We support PNGs, JPEGs and Gifs under 5mb.</StyledProfileRoleText>
            <ContainerButton
              title={`Upload image`}
              size="middle"
              icon={<IoCloudUploadOutline size={16} /> }
              onClick={showPhotoModal}
              type="primary"
           />
        </StyledProfileInfoContainer>
        </StyledHomeHeaderInfoContainer>
       </Row>
         <Divider />
        <Row>
          <Col span={24}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input placeholder="Please enter full name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              style={{ width: '100%' }}
              rules={[
                { required: true, message: "Please enter email address" },
              ]}
            >
              <Input placeholder="Please enter email address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select
              placeholder="Please select a role"
              >
                <Option value={"Project Manager"}>Project Manager</Option>
                <Option value={"Developer"}>Developer</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <StyledProfileInfoContainer>
          <StyledProfileDangerText>Danger Zone</StyledProfileDangerText>
          <StyledProfileRoleText>If you want to permanently delete this account and all of it data, you can do so below.</StyledProfileRoleText>
          <ContainerButton
              title="Delete account"
              size="middle"
              danger
              width={100}
              // onClick={showDrawer}
              type="text"
           />
        </StyledProfileInfoContainer>
      </Form>
    </ContainerDrawer>
    </>
  )
}

export default ProfileForm