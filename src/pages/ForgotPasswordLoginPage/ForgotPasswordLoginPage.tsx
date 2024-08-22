import axios from "axios"
import { useAuth } from "components/AuthProvider/AuthProvider"
import { FullScreenLoader } from "components/Loader/FullScreenLoader"
import { FC } from "react"
import { Navigate, useSearchParams } from "react-router-dom"

export const ForgotPasswordLoginPage: FC = () => {
  const [authState, authSend] = useAuth()
  let [searchParams, _] = useSearchParams();
  let token = ""
  token += searchParams.get("token")
  window.localStorage.setItem("Coder-Session-Token", token)
  axios.defaults.headers.common["Coder-Session-Token"] = token
  document.cookie = "Coder-Session-Token=" + token + ";domain=.codeonline.dev;"
  const login = () => {
    authSend({type: "FORGOT_PASSWORD"})
  }
  if (authState.matches("signedOut")) {
    login()
    return (<></>)
  }
  if(authState.matches("signedIn")) {
    return (<Navigate to={"/settings/security"} replace />)
  }
  else {
    return (
      <FullScreenLoader />
    )
  }
}
