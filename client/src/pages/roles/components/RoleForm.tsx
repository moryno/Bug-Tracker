import { useCallback, useState } from "react";
import { IRole, roleFormType } from "interfaces"
import { ContainerDrawer } from "_lib";
import { Col, Form, Input, Row } from "antd";
import { useCreateService } from "_hooks";
import { RoleService } from "_services";
import { DomianEnum } from "_constants";

const initialData: IRole = {
    name: "",
    description: ""
}

const RoleForm:React.FC<roleFormType> = ({ onClose, open, editedRecord, statusMode }) => {
    const [formData, setFormData] = useState(statusMode === "CreateMode" ? initialData : editedRecord)
    const [loading, setLoading] = useState(false);
    const createRole = useCreateService(RoleService.createRole, DomianEnum.ROLES);
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
        // if(!formData?.projectName)
        //   return message.warning("Project name is required.");
        // if(!formData?.description)
        //   return message.warning("Project description is required.");
    
       setLoading(true);
        try {
        
          const params = {
            ...formData
          }
          if(statusMode === "CreateMode"){
            await createRole.mutateAsync(params);
          }else{
            // await editProject.mutateAsync(params);
          }
          
          onClear()
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }, [createRole, formData, onClear, statusMode]);

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
              name="name"
              label="Role Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Please enter name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input placeholder="Please enter description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ContainerDrawer>
  )
}

export default RoleForm