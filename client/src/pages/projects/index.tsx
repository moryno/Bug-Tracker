import { GroupPage } from '_lib';
import ProjectForm from './components/ProjectForm';
import { DomianEnum } from '_constants';

const Projects = () => {
   
  return (
    <GroupPage title={DomianEnum.PROJECTS} FormComponent={ProjectForm} />
  )
}

export default Projects