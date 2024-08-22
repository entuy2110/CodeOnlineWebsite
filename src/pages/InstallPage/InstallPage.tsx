import { FC } from "react";
import { InstallPageView } from "./InstallPageView";
import { Helmet } from "react-helmet-async";
import { pageTitle } from "util/page";
import { useTranslation } from 'react-i18next'
import { useParams } from "react-router-dom";


export const InstallPage: FC = () => {
  const { language } = useParams()



  return (
    <>
      <Helmet>
        <title>{pageTitle("Install")}</title>
      </Helmet>

      <InstallPageView
        language={language}
      />
    </>
  )
}