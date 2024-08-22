import { FC, useEffect, useState } from "react";
import { ExamResultPageView } from "./ExamResultPageView";
import { Helmet } from "react-helmet-async";
import { pageTitle } from "util/page";
import { useTranslation } from 'react-i18next'
import { useParams } from "react-router-dom";
import { getAllResult, getProjectbyName } from "api/api";
import { ExamResult, Project } from "api/typesGenerated";
import { FullScreenLoader } from "components/Loader/FullScreenLoader";


export const ExamResultPage: FC = () => {
  const { t } = useTranslation("examResultPage")

  const { project_name: project_name_query_param } = useParams()
  const project_name = project_name_query_param
  const [project, setProject] = useState<Project>()
  const [result, setResult] = useState<ExamResult[][]>()

  useEffect( ()=> {
    const loadProject = async () => {
      if (project_name) {
        const res = await getProjectbyName(project_name)
        setProject(res)
      }
    }
    const exam_result = async () => {
      if (project_name) {
        const res = await getAllResult(project_name)
        setResult(res)
      }
    }
    loadProject()
    exam_result()
  },[project_name])

  if(project) {
    return (
      <>
        <Helmet>
          <title>{pageTitle(t("title"))}</title>
        </Helmet>
  
        <ExamResultPageView
          project={project}
          result={result}
        />
      </>
    )
  }
  return (<FullScreenLoader />)


}

