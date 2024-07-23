import { StyledMainContentView } from './index.styled'
import { StyledAppLayoutScrollbar } from '_lib/Layout/index.styled'
import { useScroll } from '_hooks';
import AppSuspense from '_lib/AppSuspense';
import AppErrorBoundary from '_lib/AppErrorBoundary';

const AppContentView = ({ routes } : { routes: any }) => {
    const { scrollRef } = useScroll();
  return (
    <StyledMainContentView>
        <StyledAppLayoutScrollbar scrollableNodeProps={{ ref: scrollRef }}>
            <AppSuspense>
               <AppErrorBoundary>{ routes }</AppErrorBoundary> 
            </AppSuspense>
        </StyledAppLayoutScrollbar>
    </StyledMainContentView>
  )
}

export default AppContentView