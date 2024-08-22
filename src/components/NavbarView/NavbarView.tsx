import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import { CoderIcon } from "components/Icons/CoderIcon"
import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { colors } from "theme/colors"
import * as TypesGen from "../../api/typesGenerated"
import { navHeight } from "../../theme/constants"
import { combineClasses } from "../../util/combineClasses"
import { UserDropdown } from "../UserDropdown/UsersDropdown"
import { useMe } from "hooks/useMe"

export const USERS_LINK = `/users?filter=${encodeURIComponent("status:active")}`

export interface NavbarViewProps {
  logo_url?: string
  user?: TypesGen.User
  buildInfo?: TypesGen.BuildInfoResponse
  supportLinks?: TypesGen.LinkConfig[]
  onSignOut: () => void
  canViewAuditLog: boolean
  canViewDeployment: boolean
  canViewTemplate: boolean
  canViewWorkspace: boolean
  user_2?: TypesGen.User_2
  isTrial: boolean
  canViewUserList: boolean
}

export const Language = {
  projects: "Teams",
  templates: "Templates",
  users: "Users",
  audit: "Audit",
  deployment: "Deployment",
}

const NavItems: React.FC<
  React.PropsWithChildren<{
    className?: string
    canViewAuditLog: boolean
    canViewDeployment: boolean
    canViewTemplate: boolean
    canViewWorkspace: boolean
    canViewUserList: boolean
  }>
> = ({ className, canViewAuditLog, canViewDeployment, canViewTemplate, canViewWorkspace, canViewUserList }) => {
  const styles = useStyles()
  const location = useLocation()

  return (
    <List className={combineClasses([styles.navItems, className])}>
      <ListItem button className={styles.item}>
        <NavLink
          className={combineClasses([
            styles.link,
            location.pathname.startsWith("/@") && "active",
          ])}
          to="/projects"
        >
          {Language.projects}
        </NavLink>
      </ListItem>
      {canViewTemplate && (
        <ListItem button className={styles.item}>
          <NavLink className={styles.link} to="/templates">
            {Language.templates}
          </NavLink>
        </ListItem>
      )}
      {canViewWorkspace && (
        <ListItem button className={styles.item}>
          <NavLink className={styles.link} to="/workspaces">
            Workspaces
          </NavLink>
        </ListItem>
      )}
      {canViewUserList && (
        <ListItem button className={styles.item}>
          <NavLink className={styles.link} to={USERS_LINK}>
            {Language.users}
          </NavLink>
        </ListItem>
      )}

      {canViewAuditLog && (
        <ListItem button className={styles.item}>
          <NavLink className={styles.link} to="/audit">
            {Language.audit}
          </NavLink>
        </ListItem>
      )}
      {canViewDeployment && (
        <ListItem button className={styles.item}>
          <NavLink className={styles.link} to="/settings/deployment/general">
            {Language.deployment}
          </NavLink>
        </ListItem>
      )}
    </List>
  )
}
export const NavbarView: React.FC<React.PropsWithChildren<NavbarViewProps>> = ({
  user,
  user_2,
  logo_url,
  buildInfo,
  supportLinks,
  onSignOut,
  canViewAuditLog,
  canViewDeployment,
  canViewTemplate,
  canViewWorkspace,
  isTrial,
  canViewUserList
}) => {
  const styles = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <nav className={styles.root}>
      <div className={styles.wrapper}>
        <IconButton
          aria-label="Open menu"
          className={styles.mobileMenuButton}
          onClick={() => {
            setIsDrawerOpen(true)
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <div className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <div className={combineClasses([styles.logo, styles.drawerLogo])}>
                {logo_url ? (
                  <img src={logo_url} alt="Custom Logo" />
                ) : (
                  <CoderIcon />
                )}
              </div>
            </div>
            <NavItems
              canViewAuditLog={canViewAuditLog}
              canViewDeployment={canViewDeployment}
              canViewTemplate={canViewTemplate}
              canViewWorkspace={canViewWorkspace}
              canViewUserList={canViewUserList}
            />
          </div>
        </Drawer>

        <NavLink className={styles.logo} to="/projects">
          {logo_url ? (
            <img src={logo_url} alt="Custom Logo" />
          ) : (
            <CoderIcon fill="white" opacity={1} width={125} />
          )}
        </NavLink>

        <NavItems
          className={styles.desktopNavItems}
          canViewAuditLog={canViewAuditLog}
          canViewDeployment={canViewDeployment}
          canViewTemplate={canViewTemplate}
          canViewWorkspace={canViewWorkspace}
          canViewUserList={canViewUserList}
        />

        <div className={styles.profileButton}>
          {(user && user_2) && (
            <UserDropdown
              user={user}
              user_2={user_2}
              buildInfo={buildInfo}
              supportLinks={supportLinks}
              onSignOut={onSignOut}
              isTrial={isTrial}
            />
          )}
        </div>
      </div>
    </nav>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: navHeight,
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  wrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-start",
    },
  },
  drawer: {
    width: 250,
  },
  drawerHeader: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  navItems: {
    padding: 0,
  },
  desktopNavItems: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  profileButton: {
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
    },
  },
  mobileMenuButton: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logo: {
    alignItems: "center",
    display: "flex",
    height: navHeight,
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    // svg is for the Coder logo, img is for custom images
    "& svg, & img": {
      height: "100%",
      objectFit: "contain",
    },
  },
  drawerLogo: {
    padding: 0,
    maxHeight: theme.spacing(5),
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  item: {
    padding: 0,
  },
  link: {
    alignItems: "center",
    color: colors.gray[6],
    display: "flex",
    flex: 1,
    fontSize: 16,
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    textDecoration: "none",
    transition: "background-color 0.15s ease-in-out",

    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },

    // NavLink adds this class when the current route matches.
    "&.active": {
      color: theme.palette.text.primary,
      fontWeight: 500,
    },

    [theme.breakpoints.up("md")]: {
      height: navHeight,
      padding: `0 ${theme.spacing(3)}px`,
    },
  },
}))
