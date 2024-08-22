import { FC, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { EditTaskPageView } from "./EditTaskPageView"
import { useParams } from "react-router-dom"
import { getProjectbyName } from "api/api"
import { FullScreenLoader } from "components/Loader/FullScreenLoader"
import { Project } from "api/typesGenerated"
import { useTranslation } from "react-i18next"

export const EditTaskPage: FC = () => {
  const { username: owner_name_query_param, project_name: project_name_query_param, project: parent_project_query_param  } = useParams()
  const project_name = project_name_query_param
  const owner_name = owner_name_query_param
  const parent_name = parent_project_query_param
  const { t } = useTranslation("editTaskPage")

  const projectPageLink = `/@${owner_name}/${parent_name}`

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
        <EditTaskPageView
          project={project}
          projectPageLink={projectPageLink}
        >
        </EditTaskPageView>
      </>
    )
  }
  return (<FullScreenLoader />)
  
}