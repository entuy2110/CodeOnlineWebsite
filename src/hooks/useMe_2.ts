import { User_2 } from "api/typesGenerated"
import { useAuth } from "components/AuthProvider/AuthProvider"
import { isAuthenticated } from "xServices/auth/authXService"

export const useMe_2 = (): User_2 => {
  const [authState] = useAuth()
  const { data } = authState.context

  if (isAuthenticated(data)) {
    return data.user_2
  }

  throw new Error("User is not authenticated")
}
