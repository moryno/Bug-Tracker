import { GroupPage } from '_lib';
import ProjectForm from './components/ProjectForm';
import { DomianEnum } from '_constants';
import { projectColumns } from './columns';

const Projects = () => {
   
  return (
    <GroupPage title={DomianEnum.PROJECTS} FormComponent={ProjectForm} columns={projectColumns} />
  )
}

export default Projects