import Link from "@material-ui/core/Link"
import { FC, useEffect, useState } from "react"
import { NavLink, Link as RouterLink, useNavigate } from "react-router-dom"
import { Margins } from "../../components/Margins/Margins"
import {
  PageHeader,
  PageHeaderSubtitle,
  PageHeaderTitle,
} from "../../components/PageHeader/PageHeader"
import { Stack } from "../../components/Stack/Stack"
import { ProjectsTable } from "components/ProjectTable/ProjectTable"
import { Project, UsersJoined } from "api/typesGenerated"
import { Pill } from "components/Pill/Pill"
import {
  AppBar,
  Box,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core"
import LaunchIcon from "@material-ui/icons/Launch"
import { useTranslation } from "react-i18next"
import { combineClasses } from "util/combineClasses"
import AddIcon from "@material-ui/icons/AddOutlined"
import { TaskCard } from "components/TaskCard/TaskCard"
import { CreateTaskDialog } from "components/CreateTaskDialog/CreateTaskDialog"
import { useMe_2 } from "hooks/useMe_2"
import { deleteProject } from "api/api"
import { displaySuccess } from "components/GlobalSnackbar/utils"
import { VisitorsTable } from "components/VisitorsTable/VisitorsTable"
import { ToggleSwitch } from "components/ToggleSwitch/ToggleSwitch"

export const Language = {
  pageTitle: "Project",
}

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

export interface ProjectPageViewProps {
  project_data: Project
  isChangingPermission: boolean
  is_public: boolean
  changePermission: (is_public: boolean) => void
  refetch: () => void
}

export const ProjectPageView: FC<
  React.PropsWithChildren<ProjectPageViewProps>
> = ({
  project_data,
  isChangingPermission,
  is_public,
  changePermission,
  refetch,
}) => {
  const { t } = useTranslation("projectPage")
  const me_2 = useMe_2()
  const styles = useStyles()
  let permissionDisplay = ""
  const tmp = localStorage.getItem(`${me_2.id}-project_page_tab`)
  const tab_value = tmp === null ? 0 : parseInt(tmp)

  const [value, setValue] = useState(tab_value)
  const canAddNewTask = me_2.id === project_data.owner_id

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    localStorage.setItem(`${me_2.id}-project_page_tab`, `${newValue}`)
    setValue(newValue)
  }

  if (isChangingPermission === true || is_public === undefined) {
    permissionDisplay = ""
  } else if (is_public === true) {
    permissionDisplay = t("public")
  } else {
    permissionDisplay = t("private")
  }
  return (
    <Margins>
      <PageHeader>
        <PageHeaderTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            {/* <Link
              target="_blank"
              href={
                project_data.me
                  ? project_data.me?.code_path
                  : project_data.owner.code_path
              }
              style={{ color: "white" }}
              underline="always"
            > */}
            {project_data.desc}
            {/* </Link> */}
          </Stack>
          &nbsp;&nbsp;
          <ToggleSwitch
            checked={is_public === undefined ? false : is_public}
            onChange={(check) => changePermission(check)}
          />
          {isChangingPermission ? (
            <></>
          ) : (
            <Link
              target="_blank"
              underline="none"
              style={{ marginLeft: "15px", display: "flex" }}
              href={
                project_data.me
                  ? project_data.me?.code_path
                  : project_data.owner.code_path
              }
            >
              <LaunchIcon color="primary" />
            </Link>
          )}
        </PageHeaderTitle>
        <PageHeaderSubtitle>
          {t("access_code")}:&nbsp;
          <span className={styles.access_code}>
            {project_data?.access_code}
          </span>
        </PageHeaderSubtitle>
      </PageHeader>
      <div className={styles.tabs}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            className={styles.tab}
            label={t("tab.members")}
            style={{ fontWeight: "400" }}
          />
          <Tab
            className={styles.tab}
            label={t("tab.submission")}
            style={{ fontWeight: "400" }}
          />
        </Tabs>
        <Divider></Divider>
        <TabPanel value={value} index={0}>
          <br />
          {project_data.project_ws_link ? (
            <p
              style={{
                margin: "0px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {t("seeAll")}
              <Link
                target="_blank"
                underline="none"
                style={{ marginLeft: "15px" }}
                href={"https://" + project_data.project_ws_link}
              >
                <LaunchIcon color="primary" />
              </Link>
            </p>
          ) : (
            <></>
          )}
          <br />
          <ProjectsTable usersJoined={project_data?.joins} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {canAddNewTask && (
            <RouterLink to={`create`} className={styles.add}>
              <div className={styles.addIcon}>
                <AddIcon fontSize="small" />
              </div>
              <div className={styles.addInfo}>
                <span className={styles.addName}>{t("createNewTask")}</span>
              </div>
            </RouterLink>
          )}

          {project_data.sub_projects &&
            project_data.sub_projects.map((sub_project) => {
              return (
                <TaskCard
                  key={sub_project.id}
                  icon={project_data.languages?.icon}
                  sub_project={sub_project}
                  onDeleteProject={async () => {
                    await deleteProject(sub_project.id)
                    displaySuccess(t("taskCard.displaySuccess"))
                  }}
                  refetch={refetch}
                />
              )
            })}
        </TabPanel>
      </div>
    </Margins>
  )
}

const useStyles = makeStyles((theme) => ({
  public: {
    backgroundColor: "#0C9A00",
    borderColor: theme.palette.info.dark,
    marginLeft: "20px",
  },
  private: {
    backgroundColor: "#CA0000",
    borderColor: theme.palette.info.dark,
    marginLeft: "20px",
  },
  tabs: {
    flexGrow: 1,
  },
  tab: {
    textTransform: "none",
    letterSpacing: "0px",
    fontSize: "14px",
    margin: "0px",
    minWidth: "100px",
  },
  add: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
    textDecoration: "none",
    textAlign: "left",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    height: "fit-content",
    "&:hover": {
      backgroundColor: theme.palette.background.paperLight,
    },
    width: "fit-content",
    marginBottom: "16px",
  },

  addIcon: {
    width: theme.spacing(6),
    height: theme.spacing(0),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,

    "& img": {
      height: theme.spacing(4),
    },
  },

  addInfo: {
    padding: theme.spacing(1, 2, 1, 0),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5),
    overflow: "hidden",
  },

  addName: {
    fontSize: theme.spacing(2),
    textOverflow: "ellipsis",
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  access_code: {
    color: "#37f5ec",
  },
}))
