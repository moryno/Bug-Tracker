import { GroupPage } from '_lib'
import BugForm from './components/BugForm'
import { DomianEnum } from '_constants'

const Bugs = () => {
  return (
    <GroupPage title={DomianEnum.BUGS} FormComponent={BugForm} columns={[]} />
  )
}

export default Bugs