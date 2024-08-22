import { useAuth } from "components/AuthProvider/AuthProvider"
import { FC } from "react"
import { Navigate, useLocation } from "react-router"
import { Outlet } from "react-router-dom"
import { embedRedirect } from "../../util/redirect"
import { FullScreenLoader } from "../Loader/FullScreenLoader"
import { useMe_2 } from "hooks/useMe_2"
import { isAuthenticated } from "xServices/auth/authXService"

export const RequireAuth: FC = () => {
  const [authState] = useAuth()
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const navigateTo = isHomePage ? "/login" : embedRedirect(location.pathname)

  if (authState.matches("signedOut")) {
    return <Navigate to={navigateTo} state={{ isRedirect: !isHomePage }} />
  } else if (authState.matches("configuringTheFirstUser")) {
    return <Navigate to="/setup" />
  } else if (
    authState.matches("loadingInitialAuthData") ||
    authState.matches("signingOut")
  ) {
    return <FullScreenLoader />
  } else if (isAuthenticated(authState.context.data) && authState.context.data.user_2.fullname === "" 
  && window.location.pathname !== "/settings/account") {
    return <Navigate to="/settings/account" />
  } 
  else {
    return <Outlet />
  }
}
