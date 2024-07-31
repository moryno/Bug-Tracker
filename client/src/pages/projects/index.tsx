import React from 'react'
import { GroupPage } from '_lib';
import ProjectForm from './components/ProjectForm';

const Projects = () => {
   
  return (
    <GroupPage title='Project' FormComponent={ProjectForm} />
  )
}

export default Projects