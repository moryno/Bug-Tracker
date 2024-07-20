import React from 'react'
import { GroupPage } from '_lib'
import BugForm from './components/BugForm'

const Bugs = () => {
  return (
    <GroupPage title='Bug' FormComponent={BugForm} />
  )
}

export default Bugs