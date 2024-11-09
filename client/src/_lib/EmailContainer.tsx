import { DomianEnum } from "_constants";
import { useGetAll } from "_hooks";
import { NotificationService, UserService } from "_services";
import { Form, Input, Modal, Select, message } from "antd"
import { IUser } from "interfaces";
import ContainerButton from "./ContainerButton";
import { useCallback, useState } from "react";
import { StyledFormButtonContainer } from "./StyledComponents";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"

const { Option } = Select;

const EmailContainer = ({ open, onClose, recipientEmail } : { open: boolean, onClose : () => void, recipientEmail: string | null}) => {
    const { isLoading: isUserLoading, data: userData } = useGetAll(UserService.getAllUsers, `${DomianEnum.USERS}-email`);
    const [loading, setLoading] = useState(false);
    const [customMessage, setMessage] = useState("");
    const [form] = Form.useForm();

    const onFinish = useCallback(async (values: any) => {
        if(!customMessage || customMessage === "") return message.warning("Please enter custom message.");

        setLoading(true);

        const payload = {
            ...values,
            customMessage: customMessage
        }
        console.log(payload)
        try {
            await NotificationService.sendEmailToTeamMember(payload);
            message.success("Email send succefully");
            setLoading(false);
            onClose();
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }, [customMessage, onClose]);

  return (
    <Modal 
        title="New Mail"
        centered
        open={open}
        footer={false}
        onCancel={onClose}
        width={900}
        destroyOnClose
    >
        <Form 
           form={form}
           onFinish={onFinish}
           initialValues={{ recipientId: recipientEmail }}
           layout="vertical"
           autoComplete="off"
        >
            <Form.Item
               name="recipientId"
               label="Recipient"
               rules={[{ required: false, message: "Please select recipient" }]}
                >
                <Select
                    placeholder="Please select recepient"
                    loading={isUserLoading}
                    >
                    {userData?.data && 
                        userData?.data?.map( (user: IUser) => (
                        <Option key={user?.email} value={user?.email}>{ user?.fullName }</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Please enter subject" }]}
            >
              <Input placeholder="Please enter subject" />
            </Form.Item>
            <Form.Item
              label="Custom Message"
            >
              <ReactQuill theme="snow" onChange={setMessage} value={customMessage} />
            </Form.Item>
            <StyledFormButtonContainer>
            <ContainerButton disabled={loading} onClick={onClose} htmlType="button" title="Discard" size="middle" />
            <ContainerButton loading={loading} htmlType="submit" type="primary" title="Send email" size="middle" />
          </StyledFormButtonContainer>
        </Form>
    </Modal>
  )
}

export default EmailContainer