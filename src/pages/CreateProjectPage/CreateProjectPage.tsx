import { useFilter } from "hooks/useFilter"
import { usePagination } from "hooks/usePagination"
import { FC } from "react"
import { Helmet } from "react-helmet-async"
import { workspaceFilterQuery } from "util/filters"
import { pageTitle } from "util/page"
import { CreateProjectPageView } from "./CreateProjectPageView"
import { createProjectPageMachine } from "xServices/createProjectPage/createProjectPageXService"
import { useMachine } from "@xstate/react"
import { useTranslation } from "react-i18next"

const CreateProjectPage: FC = () => {
  const { t } = useTranslation("createProjectPage")

  const [createProjectPageState, send] = useMachine(createProjectPageMachine) 
  const {
    languagePrograms,
    error,
  } = createProjectPageState.context

  return (
    <>
      <Helmet>
        <title>{pageTitle(t("pageTitle"))}</title>
      </Helmet>

      <CreateProjectPageView
        languagePrograms={languagePrograms}
        creatingProject={createProjectPageState.matches("creatingProject")}
        created={createProjectPageState.matches("idle.ok")}
        onSubmit={(request) => {
          send({
            type: "CREATE_PROJECT",
            request,
          })
        }}
      />
    </>
  )
}

export default CreateProjectPage
