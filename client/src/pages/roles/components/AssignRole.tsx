import { useCallback, useEffect, useState } from "react";
import { assignType, IUser } from "interfaces"
import { ContainerDrawer } from "_lib";
import { Col, Form, Row, Select } from "antd";
import { useCreateService, useGetAll, useGetById } from "_hooks";
import { RoleService, UserService } from "_services";
import { DomianEnum } from "_constants";
const { Option } = Select;

const initialData: assignType = {
    roleIds: [],
    userName: ""
  }

const AssignRole = ({ onClose, open, userName  }: { onClose: () => void, open: boolean, userName: string | null}) => {
    const [formData, setFormData] = useState({...initialData, userName: userName })
    const [loading, setLoading] = useState(false);
    const assignRole = useCreateService(RoleService.assignRole, DomianEnum.TEAM);
    const { isLoading: isUserLoading, data: userData } = useGetAll(UserService.getAllUsers, `${DomianEnum.USERS}-role-users`);
    const { isLoading: isRolesLoading, data: rolesData } = useGetAll(RoleService.getRoles, `${DomianEnum.ROLES}-roles`);
    const { isLoading: isUserRoleLoading, data: userRolesData } = useGetById(RoleService.getUserRole, `${DomianEnum.ROLES}-user-role`, userName);
    const [form] = Form.useForm();

    const handleValueChange = useCallback((e: any) => {
        setFormData(prev => (
          { ...prev, ...e }
        ));
      },[]);
    
      const onClear = useCallback(() => {
        setLoading(false);
        onClose();
        form.resetFields();
      }, [form, onClose]);

    
      const onFinish = useCallback(async () => {
       setLoading(true);
        try {
        
          const params = {
            ...formData
          }
          await assignRole.mutateAsync(params);
          
          onClear()
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }, [assignRole, formData, onClear]);

      useEffect(() => {
        if(!isUserRoleLoading && userRolesData?.data){
          const roleIds = userRolesData?.data?.map((role: any) => role?.id);
          setFormData((prev) => ({ ...prev, roleIds }));
    
          form.setFieldsValue({
            roleIds, 
          });
        }
      }, [form, isUserRoleLoading, userRolesData?.data]);

  return (
    <ContainerDrawer 
       onFinish={onFinish} 
       onClose={onClear} 
       open={open} 
       loading={loading}
       title="Add Role"
       width={560}
     >
      <Form 
        form={form}
        initialValues={formData || undefined}
        onValuesChange={handleValueChange}
        layout="vertical"
      >
        <Row gutter={16}>
            <Col span={24}>
            <Form.Item
                name="userName"
                label="Team member"
                rules={[{ required: true, message: "Please select name" }]}
            >
             <Select
                placeholder="Please select name"
                loading={isUserLoading}
                disabled={userName ? true : false}
                >
                {userData?.data && 
                    userData?.data?.map( (user: IUser) => (
                    <Option key={user?.userName} value={user?.userName}>{ user?.fullName }</Option>
                ))}
                </Select>
            </Form.Item>
            </Col>
          <Col span={24}>
          <Form.Item
            name="roleIds"
            label="Role Name"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select
             mode="multiple" 
             placeholder="Please select role"
             loading={isRolesLoading}
             >
            {rolesData?.data?.data && 
                rolesData?.data?.data?.map( (role: any) => (
                  <Option key={role?.id} value={role?.id}>{ role?.name}</Option>
            ))}
            </Select>
          </Form.Item>
        </Col>
        </Row>
      </Form>
    </ContainerDrawer>
  )
}

export default AssignRole