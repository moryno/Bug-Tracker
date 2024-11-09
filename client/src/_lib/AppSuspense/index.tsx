import AppLoader from '_lib/AppLoader'
import { ReactNode, Suspense } from 'react'

const AppSuspense = ({ children } : { children: ReactNode}) => {
  return (
    <Suspense fallback={<AppLoader />}>{ children }</Suspense>
  )
}

export default AppSuspense