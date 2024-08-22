import { useAuth } from "components/AuthProvider/AuthProvider"
import { FC } from "react"
import { Navigate } from "react-router-dom"
import { LandingPage } from "./LandingPage/LandingPage"
import { FullScreenLoader } from "components/Loader/FullScreenLoader"

const IndexPage: FC = () => {
  const [auth] = useAuth();
  
  if (auth.matches("signedIn")) return <Navigate to="/projects" replace />
  if (auth.matches("signedOut")) return <LandingPage />
  
  return <FullScreenLoader/>
}

export default IndexPage
