import { FC } from "react";
import { useMachine } from "@xstate/react"
import { Helmet } from "react-helmet-async";
import { pageTitle } from "util/page";
import { TaskPageView } from "./TaskPageView";
import { useParams } from "react-router-dom"
import { useMe } from "hooks/useMe"
import { useProjectData } from "./data"
import { FullScreenLoader } from "components/Loader/FullScreenLoader";
import { useTranslation } from 'react-i18next'


export const TaskPage: FC = () => {
  const { t } = useTranslation("TaskPage")
  const { username: usernameQueryParam, project: projectNameQueryParam, sub_project: subProjectQueryParam } = useParams()
  
  const username = usernameQueryParam
  const project_name = projectNameQueryParam
  const sub_project_name = subProjectQueryParam
  const { data, error, queryKey } = useProjectData(sub_project_name ?? "") 
  const project_link = `/@${username}/${project_name}`
  
  if (data) {
    return (
      <>
        <Helmet>
          <title>{pageTitle("Task")}</title>
        </Helmet>

        <TaskPageView
          project_data={data}
          project_link={project_link}
        />
      </>
    )
  }
  return (<FullScreenLoader />)
}