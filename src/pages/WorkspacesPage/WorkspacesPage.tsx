import { useFilter } from "hooks/useFilter"
import { usePagination } from "hooks/usePagination"
import { FC } from "react"
import { Helmet } from "react-helmet-async"
import { workspaceFilterQuery } from "util/filters"
import { pageTitle } from "util/page"
import { useWorkspacesData, useWorkspaceUpdate } from "./data"
import { WorkspacesPageView } from "./WorkspacesPageView"
import { workspacePageMachine } from "xServices/workspacePage/workspacePageXService"
import { useMachine } from "@xstate/react"
import { useMe } from "hooks/useMe"
import { RequirePermission } from "components/RequirePermission/RequirePermission"

const WorkspacesPage: FC = () => {
  const filter = useFilter(workspaceFilterQuery.me)
  const pagination = usePagination()
  const { data, error, queryKey } = useWorkspacesData({
    ...pagination,
    ...filter,
  })
  const me = useMe()
  const updateWorkspace = useWorkspaceUpdate(queryKey)
  const user_id = me.id
  const [workspacePageState] = useMachine(workspacePageMachine, {
    context: {
      user_id,
    },
  })
  const roles = me.roles
  const is_owner = roles.some((role) => {
    return role.name === "owner" && role.display_name === "Owner"
  }) 
  const canViewWorkspace = is_owner

  const {
    joinWorkspaces,
  } = workspacePageState.context

  return (
    <RequirePermission isFeatureVisible={canViewWorkspace}>
      <>
        <Helmet>
          <title>{pageTitle("Workspaces")}</title>
        </Helmet>

        <WorkspacesPageView
          joinWorkspaces={joinWorkspaces}
          workspaces={data?.workspaces}
          error={error}
          filter={filter.query}
          onFilter={filter.setFilter}
          count={data?.count}
          page={pagination.page}
          limit={pagination.limit}
          onPageChange={pagination.goToPage}
          onUpdateWorkspace={(workspace) => {
            updateWorkspace.mutate(workspace)
          }}
        />
      </>
    </RequirePermission>
  )
}

export default WorkspacesPage
