import {GroupPage } from '_lib'
import { DomianEnum } from '_constants'
import { bugColumns } from 'pages/bugs/columns'
import { BugService } from '_services'
import InviteForm from './components/InviteForm'

const Users = () => {
  return (
      <GroupPage
        title={DomianEnum.BUGS} 
        FormComponent={InviteForm} 
        columns={bugColumns}
        getAllService={BugService.getBugs}
        getDetailService={BugService.getBug}
        deleteService={BugService.deleteBug}
     />
  )
}

export default Users