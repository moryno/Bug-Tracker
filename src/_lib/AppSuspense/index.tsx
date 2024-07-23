import React, { ReactNode, Suspense } from 'react'

const AppSuspense = ({ children } : { children: ReactNode}) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>{ children }</Suspense>
  )
}

export default AppSuspense