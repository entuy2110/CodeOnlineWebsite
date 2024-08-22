import { useAuth } from "components/AuthProvider/AuthProvider"
import { useDashboard } from "components/Dashboard/DashboardProvider"
import { useFeatureVisibility } from "hooks/useFeatureVisibility"
import { useMe } from "hooks/useMe"
import { usePermissions } from "hooks/usePermissions"
import { FC, useEffect, useState } from "react"
import { NavbarView } from "../NavbarView/NavbarView"
import { useMe_2 } from "hooks/useMe_2"
import { useLocation, useMatch } from "react-router-dom"

export const Navbar: FC = () => {
  const { appearance, buildInfo } = useDashboard()
  const [_, authSend] = useAuth()
  const me = useMe()
  const me_2 = useMe_2()
  const permissions = usePermissions()
  const featureVisibility = useFeatureVisibility()
  const canViewAuditLog =
    featureVisibility["audit_log"] && Boolean(permissions.viewAuditLog)
  const canViewDeployment = Boolean(permissions.viewDeploymentValues)
  const onSignOut = () => authSend("SIGN_OUT")
  const roles = me.roles
  const is_owner = roles.some((role) => {
    return role.name === "owner" && role.display_name === "Owner"
  }) 
  const canViewTemplate = is_owner
  const canViewWorkspace = is_owner
  const canViewUserList = is_owner
  const isTrial = !is_owner
  
  if(useMatch('/chat/:project_name') || useMatch('/install/:language')) {
    return (<></>)
  }

  return (
    <NavbarView
      user={me}
      user_2={me_2}
      logo_url={appearance.config.logo_url}
      buildInfo={buildInfo}
      supportLinks={appearance.config.support_links}
      onSignOut={onSignOut}
      canViewAuditLog={canViewAuditLog}
      canViewDeployment={canViewDeployment}
      canViewTemplate={canViewTemplate}
      canViewWorkspace={canViewWorkspace}
      isTrial={isTrial}
      canViewUserList={canViewUserList}
    />
  )
}
