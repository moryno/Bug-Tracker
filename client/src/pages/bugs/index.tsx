import { GroupPage } from '_lib'
import BugForm from './components/BugForm'
import { DomianEnum } from '_constants'
import { BugService } from '_services'
import { bugColumns } from './columns'

const Bugs = () => {
  return (
    <GroupPage 
    title={DomianEnum.BUGS} 
    FormComponent={BugForm} 
    columns={bugColumns}
    getAllService={BugService.getBugs}
    getDetailService={BugService.getBug}
    deleteService={BugService.deleteBug}
     />
  )
}

export default Bugs