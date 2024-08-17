import { GroupPage } from '_lib';
import ProjectForm from './components/ProjectForm';
import { DomianEnum } from '_constants';
import { projectColumns } from './columns';
import { ProjectService } from '_services';

const Projects = () => {
   
  return (
    <GroupPage 
      title={DomianEnum.PROJECTS} 
      FormComponent={ProjectForm} 
      columns={projectColumns}
      getAllService={ProjectService.getProjects}
      getDetailService={ProjectService.getProject}
      deleteService={ProjectService.deleteProject}
     />
  )
}

export default Projects