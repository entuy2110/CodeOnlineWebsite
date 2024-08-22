import { Helmet } from "react-helmet-async"
import SignupPageView from "./SignupPageView"
import { FC, useEffect, useState } from "react"
import { signUp } from "api/api"
import { displayError } from "components/GlobalSnackbar/utils"
import { useTranslation } from "react-i18next"
import { useAuth } from "components/AuthProvider/AuthProvider"
import axios from "axios"

export const SignupPage: FC = () => {
  const { t } = useTranslation("signUpPage")
  const [authState, authSend] = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const signup = async (email: string, password: string, fullname: string) => {
    setIsLoading(true)
    await signUp(email, password, fullname).then((coder_session_token) => {
      window.localStorage.setItem("Coder-Session-Token", coder_session_token)
      axios.defaults.headers.common["Coder-Session-Token"] = coder_session_token
      document.cookie = "Coder-Session-Token=" + coder_session_token + ";domain=.codeonline.dev;"
      authSend({ type: "LOGIN_BY_SIGNUP"})
    }).catch(() => {
      setIsLoading(false)
      displayError(t("signUpform.errorMessage"))
    })
  }
  useEffect(() => {
    if (authState.matches("loginingBySignup") === true) {
      setIsLoading(false)
    }
  },[authState])

  return (
  <>
      <Helmet>
      <title>
          {t("title")}
      </title>
      </Helmet>
      <SignupPageView
        signUp={signup}  
        isSigningUp={authState.matches("loginingBySignup") || isLoading}
      />
  </>
  )
    
}
  
export default SignupPage