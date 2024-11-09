import LandingPageNavbar from "pages/landing-page/components/LandingPageNavbar";
import AppContentView from "_lib/AppContentView";

const AnonymousRouteLayout = ({ routes }: { routes: any }) => {
  return (
    <>
      <LandingPageNavbar />
      <AppContentView routes={routes} />
    </>
  )
}

export default AnonymousRouteLayout