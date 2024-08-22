import { FC, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { AddTaskPageView } from "./AddTaskPageView"
import { useParams } from "react-router-dom"
import { getProjectbyName } from "api/api"
import { FullScreenLoader } from "components/Loader/FullScreenLoader"
import { Project } from "api/typesGenerated"
import { useTranslation } from "react-i18next"

export const AddTaskPage: FC = () => {
  const { t } = useTranslation("addTaskPage")
  const { username: owner_name_query_param, project: project_name_query_param } = useParams()
  const project_name = project_name_query_param
  const owner_name = owner_name_query_param

  const projectPageLink = `/@${owner_name}/${project_name}`
  const [project, setProject] = useState<Project>()

  const loadProject = async () => {
    if (project_name) {
      const res = await getProjectbyName(project_name)
      setProject(res)
    }
  }
  useEffect( ()=> {
    loadProject()
  },[project_name])

  if(project) {
    return (
      <>
        <Helmet>
          <title>{t("title")}</title>
        </Helmet>
        <AddTaskPageView
          parent_project={project}
          projectPageLink={projectPageLink}
        >
        </AddTaskPageView>
      </>
    )
  }
  return (<FullScreenLoader />)
  
}
