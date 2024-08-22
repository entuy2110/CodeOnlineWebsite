import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import { en } from "./en"
import { vi } from "./vi"

export const defaultNS = "common"
export const resources = { en, vi } as const


export const i18n = i18next.use(initReactI18next)
if (localStorage.getItem("language") === null) {
  localStorage.setItem("language", "vi")
}
const lang = "" + (localStorage.getItem("language") === null ? "vi" : localStorage.getItem("language"))


i18n
  .init({
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  })
  .catch((error) => {
    // we are catching here to avoid lint's no-floating-promises error
    console.error("[Translation Service]:", error)
  })

i18n.changeLanguage(lang)