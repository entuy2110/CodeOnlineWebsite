import { FC } from "react";
import { SettingPageView } from "./SettingPageView";
import { Helmet } from "react-helmet-async";
import { pageTitle } from "util/page";
import { useTranslation } from 'react-i18next'


export const SettingPage: FC = () => {
  const { t, i18n } = useTranslation("settingPage")

  const changeLanguage = (lang: string) => {
    localStorage.setItem("language", lang)
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle(t("title"))}</title>
      </Helmet>

      <SettingPageView
        changeLanguage={changeLanguage}
      />
    </>
  )
}