import { useActor, useInterpret } from "@xstate/react"
import { createContext, FC, PropsWithChildren, useContext } from "react"
import { authXService_2 } from "xServices/auth_2/authXService_2"
import { ActorRefFrom } from "xstate"

interface AuthContextValue {
  authService: ActorRefFrom<typeof authXService_2>
}

const AuthContext_2 = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider_2: FC<PropsWithChildren> = ({ children }) => {
  const authService = useInterpret(authXService_2)

  return (
    <AuthContext_2.Provider value={{ authService }}>
      {children}
    </AuthContext_2.Provider>
  )
}

type UseAuthReturnType = ReturnType<
  typeof useActor<AuthContextValue["authService"]>
>

export const useAuth_2 = (): UseAuthReturnType => {
  const context = useContext(AuthContext_2)

  if (!context) {
    throw new Error("useAuth should be used inside of <AuthProvider />")
  }

  const auth = useActor(context.authService)

  return auth
}
