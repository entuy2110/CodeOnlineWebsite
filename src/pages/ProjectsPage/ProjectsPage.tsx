import { usePagination } from "hooks/usePagination"
import { FC } from "react"
import { Helmet } from "react-helmet-async"
import { pageTitle } from "util/page"
import { ProjectsPageView } from "./ProjectsPageView"
import { projectsPageMachine } from "xServices/projectsPage/projectsPageXService"
import { useMachine } from "@xstate/react"
import { useMe } from "hooks/useMe"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { displaySuccess } from "components/GlobalSnackbar/utils"

const ProjectsPage: FC = () => {
  const { t } = useTranslation("projectsPage")
  const pagination = usePagination()
  const me = useMe()
  const user_id = me.id
  const navigate = useNavigate()
  const [projectsPageState, send] = useMachine(projectsPageMachine, {
    context: {
      user_id,
    },
  })

  const { user_data, project_name } = projectsPageState.context

  return (
    <>
      <Helmet>
        <title>{pageTitle(t("title"))}</title>
      </Helmet>

      <ProjectsPageView
        user_data={user_data}
        page={pagination.page}
        limit={pagination.limit}
        onPageChange={pagination.goToPage}
        joined={projectsPageState.matches("end.joined")}
        onDeleteProject={(project_id) => {
          send({
            type: "DELETEPROJECT",
            project_id,
            message: t("deleteSuccess"),
          })
        }}
        onJoinProject={(access_code) => {
          send({
            type: "JOINPROJECT",
            access_code,
          })
        }}
        onJoinedProject={() => {
          navigate(`/@${me.username}/${project_name}`)
        }}
      />
    </>
  )
}

export default ProjectsPage
