import { DomianEnum } from "_constants"
import { GroupPage } from "_lib"
import {  RoleService } from "_services"
import { roleColumns } from "./columns"
import RoleForm from "./components/RoleForm"


const RolesPage = () => {
  return (
    <GroupPage 
        title={DomianEnum.ROLES} 
        FormComponent={RoleForm} 
        columns={roleColumns}
        width={"100%"}
        getAllService={RoleService.getRoles}
        getDetailService={RoleService.getUserRole}
   />
  )
}

export default RolesPage