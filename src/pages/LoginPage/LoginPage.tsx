import { useAuth } from "components/AuthProvider/AuthProvider"
import { FC, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { retrieveRedirect } from "../../util/redirect"
import { LoginPageView } from "./LoginPageView"
import { type } from "os"

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { loginWithGoogle } from "api/api"
import axios from "axios"
import { ContactsOutlined } from "@material-ui/icons"

export const LoginPage: FC = () => {

  firebase.initializeApp({
    apiKey: "AIzaSyB7HAnr-7v1D9giLD8JYTYGYQs-fFasGiI",
    authDomain: "chat-firebase-d8938.firebaseapp.com",
    projectId: "chat-firebase-d8938",
    storageBucket: "chat-firebase-d8938.appspot.com",
    messagingSenderId: "407071322588",
    appId: "1:407071322588:web:5bde820dc63f5b4e32df19",
    measurementId: "G-DQMX3Y2C4V"
  })

  // firebase.initializeApp({
  //   apiKey: "AIzaSyDAZz4P0aP9NwitzL61Tmxotmx3nAkNRtw",
  //   authDomain: "chat-6e69a.firebaseapp.com",
  //   projectId: "chat-6e69a",
  //   storageBucket: "chat-6e69a.appspot.com",
  //   messagingSenderId: "561164232740",
  //   appId: "1:561164232740:web:a4749bfe83d67d249e90b1",
  //   measurementId: "G-KLX108KD5G"
  // })
  const location = useLocation()
  const [authState, authSend] = useAuth()
  const redirectTo = retrieveRedirect(location.search)
  const commonTranslation = useTranslation("common")
  const loginPageTranslation = useTranslation("loginPage")

  const auth = firebase.auth();

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider)
    const token = await res.user?.getIdToken()
    if (res.user?.email && token) {
      loginWithGoogle(res.user?.email, "", token).then((coder_session_token) => {
        window.localStorage.setItem("Coder-Session-Token", coder_session_token.session_token)
        axios.defaults.headers.common["Coder-Session-Token"] = coder_session_token.session_token
        document.cookie = "Coder-Session-Token=" + coder_session_token.session_token + ";domain=.codeonline.dev;"
        authSend({ type: "SIGN_IN_WITH_GOOGLE"})
      })
    }
    else {
      throw new Error("Can't get enough infomations")
    }
  }
  
  if (authState.matches("signedIn")) {
    return <Navigate to={redirectTo} replace />
  } else if (authState.matches("configuringTheFirstUser")) {
    return <Navigate to="/setup" />
  } else {
    return (
      <>
        <Helmet>
          <title>
            {loginPageTranslation.t("signInTo")} {commonTranslation.t("coder")}
          </title>
        </Helmet>
        <LoginPageView
          context={authState.context}
          isLoading={authState.matches("loadingInitialAuthData")}
          isSigningIn={authState.matches("signingIn")}
          onSignIn={({ email, password }) => {
            authSend({ type: "SIGN_IN", email, password })
            // authSend_2({ type: "SIGN_IN"})
          }}
          signInWithGoogle={signInWithGoogle}
        />
      </>
    )
  }
}

export default LoginPage
