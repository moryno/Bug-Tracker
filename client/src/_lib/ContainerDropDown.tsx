import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { MenuPropsType } from 'interfaces';

const ContainerDropDown = ({ menuProps } : { menuProps: MenuPropsType}) => {
  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
            Actions
            <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}

export default ContainerDropDown