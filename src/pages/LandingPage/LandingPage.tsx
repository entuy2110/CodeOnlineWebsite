import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { LandingPageView } from "./LandingPageView";

export const LandingPage: FC = () => {

  return (<>
    <Helmet>
      <title>landing</title>
    </Helmet>

    <LandingPageView />
  </>)
}