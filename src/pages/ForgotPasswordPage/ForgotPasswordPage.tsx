import { Helmet } from "react-helmet-async"
import ForgotPasswordPageView from "./ForgotPasswordPageView"
import { FC } from "react"
import { sendResetPassword } from "api/api"
import { displayError, displaySuccess } from "components/GlobalSnackbar/utils"
import { useTranslation } from "react-i18next"

const resetPassword = async (email: string) => {
  try {
    const res = await sendResetPassword(email)
    if (res) {
      displaySuccess("We have sent you a password reset link via this email.")
    }
  } catch{
    displayError("This email could not be found.")
  }

}

export const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation("forgotPasswordPage")

  return (
  <>
      <Helmet>
      <title>
          {t("title")}
      </title>
      </Helmet>
      <ForgotPasswordPageView
        sendResetPassword={resetPassword}  
      />
  </>
  )
    
}
  
export default ForgotPasswordPage