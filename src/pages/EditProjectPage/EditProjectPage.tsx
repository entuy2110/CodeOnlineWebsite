import { FC, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { pageTitle } from "util/page"
import { EditProjectPageView } from "./EditProjectPageView"
import { useParams } from "react-router-dom"
import { Project } from "api/typesGenerated"
import { getProjectbyName } from "api/api"
import { FullScreenLoader } from "components/Loader/FullScreenLoader"
import { useTranslation } from "react-i18next"


const EditProjectPage: FC = () => {
  const { t } = useTranslation("editProjectPage")
  const { project_name: project_id_query_param } = useParams()
  const project_name = project_id_query_param
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
          <title>{pageTitle(t("pageTitle"))}</title>
        </Helmet>
        <EditProjectPageView
          project_id={project.id}
          project_desc={project.desc}
          project_name={project.name}
        >
        </EditProjectPageView>
      </>
    )
  }
  return (<FullScreenLoader />)
}

export default EditProjectPage
