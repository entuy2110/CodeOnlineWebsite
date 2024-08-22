import {
    useQuery,
  } from "@tanstack/react-query"
  import {

  } from "api/typesGenerated"
  import { getUser } from "api/api"

  export const useUserData = () => {
    const queryKey = ["user"]
    const result = useQuery({
      queryKey,
      queryFn: () =>
      getUser(),
      refetchInterval: 2_000,
    })
  
    return {
      ...result,
      queryKey,
    }
  }