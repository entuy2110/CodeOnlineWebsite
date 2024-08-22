import { useMachine } from "@xstate/react"
import { useOrganizationId } from "hooks/useOrganizationId"
import { usePermissions } from "hooks/usePermissions"
import { FC } from "react"
import { Helmet } from "react-helmet-async"
import { pageTitle } from "../../util/page"
import { templatesMachine } from "../../xServices/templates/templatesXService"
import { TemplatesPageView } from "./TemplatesPageView"
import { RequirePermission } from "components/RequirePermission/RequirePermission"
import { useMe } from "hooks/useMe"

export const TemplatesPage: FC = () => {
  const organizationId = useOrganizationId()
  const permissions = usePermissions()
  const me = useMe()
  const roles = me.roles
  const is_owner = roles.some((role) => {
    return role.name === "owner" && role.display_name === "Owner"
  }) 
  const canViewTemplate = is_owner
  const [templatesState] = useMachine(templatesMachine, {
    context: {
      organizationId,
      permissions,
    },
  })

  return (
    <RequirePermission isFeatureVisible={canViewTemplate}>
      <>
        <Helmet>
          <title>{pageTitle("Templates")}</title>
        </Helmet>
        <TemplatesPageView context={templatesState.context} />
      </>
    </RequirePermission>
  )
}

export default TemplatesPage
