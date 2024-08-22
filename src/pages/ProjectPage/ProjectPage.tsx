import { FC, useState } from "react"
import { projectPageMachine } from "xServices/projectPage/projectPageXService"
import { useMachine } from "@xstate/react"
import { Helmet } from "react-helmet-async"
import { pageTitle } from "util/page"
import { ProjectPageView } from "./ProjectPageView"
import { useParams } from "react-router-dom"
import { useMe } from "hooks/useMe"
import { useProjectData } from "./data"
import { FullScreenLoader } from "components/Loader/FullScreenLoader"
import { useTranslation } from "react-i18next"
import { displayMsg } from "components/GlobalSnackbar/utils"

export const ProjectPage: FC = () => {
  const { t } = useTranslation("projectPage")
  const { project: projectQueryParam } = useParams()
  const user_id = useMe().id
  const project_name = projectQueryParam
  const { data, refetch } = useProjectData(project_name ?? "")
  // const [timeoutOpenWindow, setTimeoutOpenWindow] = useState<NodeJS.Timeout | undefined>()
  const [projectPageState, send] = useMachine(projectPageMachine, {
    context: {
      project_name,
      refetch,
    },
  })
  const { is_public } = projectPageState.context
  if (data) {
    return (
      <>
        <Helmet>
          <title>{pageTitle(t("title"))}</title>
        </Helmet>

        <ProjectPageView
          project_data={data}
          is_public={is_public}
          isChangingPermission={
            projectPageState.matches("changingPermission") ||
            projectPageState.matches("changingPermission")
          }
          changePermission={(is_public) => {
            send({
              type: "CHANGEPERMISSION",
              is_public,
            })
          }}
          refetch={refetch}
        />
      </>
    )
  }
  return <FullScreenLoader />
}
