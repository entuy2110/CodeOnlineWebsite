import {
    useQuery,
  } from "@tanstack/react-query"
  import {

  } from "api/typesGenerated"
  import { getProjectbyName } from "api/api"

  export const useProjectData = (project_name: string) => {
    const queryKey = ["project", project_name]
    const result = useQuery({
      queryKey,
      queryFn: () =>
        getProjectbyName(project_name),
      refetchInterval: 5000,
    })
  
    return {
      ...result,
      queryKey,
    }
  }