import Link from "@material-ui/core/Link"
import { FC, useState } from "react"
import { NavLink, Link as RouterLink } from "react-router-dom"
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
import { AppBar, Box, CircularProgress, Divider, Tab, Tabs, Typography, makeStyles } from "@material-ui/core"
import LaunchIcon from '@material-ui/icons/Launch';
import { useTranslation } from "react-i18next"
import { combineClasses } from "util/combineClasses"
import AddIcon from "@material-ui/icons/AddOutlined"
import { TaskCard } from "components/TaskCard/TaskCard"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { convertMiliSecToTime } from "util/time"
import { useMe_2 } from "hooks/useMe_2"

export const Language = {
  pageTitle: "Project",
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export interface TaskPageViewProps {
  project_data: Project,
  project_link: string
}

export const TaskPageView: FC<
  React.PropsWithChildren<TaskPageViewProps>
> = ({
  project_data,
  project_link
}) => {
    const { t } = useTranslation("TaskPage")
    const styles = useStyles()
    const me_2 = useMe_2()
    const owner = project_data.owner_id === me_2.id
    const canViewWS = owner || new Date(project_data.start_date).getTime() < new Date().getTime()
    // const commonTranslation = useTranslation("common")

    // const due_time = new Date(project_data.due_date).getTime()
    // const today = new Date().getTime()
    // const timeDiff = due_time > today ? due_time - today : 0
    // const day_diffs = timeDiff / (1000 * 60 * 60 * 24)
    // let time_text = ""
    // if (project_data.due_date !== null) {
    //   if (day_diffs > 1) {
    //     time_text = "Thời gian còn lại: " + Math.ceil(day_diffs) + " " +  commonTranslation.t("date.days")
    //   } else if (day_diffs === 1) {
    //     time_text = "Thời gian còn lại: " + Math.ceil(day_diffs) + " " + commonTranslation.t("date.day")
    //   } else if (day_diffs > 0) {
    //     time_text = "Thời gian còn lại: " + Math.floor((timeDiff / (1000 * 60 * 60)) % 24) + " giờ " + (Math.floor((timeDiff / (1000 * 60)) % 60) + 1) + " phút"
    //   } else {
    //     time_text = "Hết hạn"
    //   }    
    // }

    return (
      <Margins>
        <PageHeader>
          <PageHeaderTitle>
            <Stack direction="row" spacing={0} alignItems="center">
              <Link
                style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', color: "inherit" }}
                underline="none"
                href={project_link}
              >
                <ArrowBackIosIcon></ArrowBackIosIcon>
                <span>{project_data.parent_name}</span>
              </Link>
            </Stack>
          </PageHeaderTitle>
          <br></br>
          <PageHeaderTitle>
            <Stack direction="row" spacing={1} alignItems="center">
              <span>&nbsp;&nbsp;&nbsp;&nbsp; {project_data.desc}</span>
            </Stack>
            <Link
              target="_blank"
              underline="none"
              style={{ marginLeft: "15px", display: "flex" }}
              href={(project_data.me ? project_data.me?.code_path : project_data.owner.code_path)}
            >
              <LaunchIcon color="primary" />
            </Link>

          </PageHeaderTitle>
          <PageHeaderSubtitle>
            {project_data.start_date && (new Date(project_data.start_date).getTime() > new Date().getTime()) ?
              <>
                <span style={{ color: "rgb(97 220 83)" }} className={styles.templateDescription}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Thời gian bắt đầu: {(new Date(project_data.start_date)).toLocaleString('vi-VI', { dateStyle: "full", timeStyle: 'short' }).replace("lúc ", "")}</span>
                <br />
              </>
              :
              <>
                <span style={{ color: "rgb(97 220 83)" }} className={styles.templateDescription}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đã bắt đầu</span>
                <br />
              </>
            }

            {project_data.due_date ?
              <span style={{ color: "rgb(202 211 66)" }} className={styles.templateDescription}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thời gian kết thúc:&nbsp;
                {
                  (new Date(project_data.due_date)).toLocaleString('vi-VI', { dateStyle: "full", timeStyle: 'short' }).replace("lúc ", "")
                } &nbsp;&nbsp;&nbsp;
              </span>
              :
              <></>
            }
            {project_data.submission ?
              <Link
                href={project_data.submission ? "https://" + project_data.submission : undefined}
                target="_blank"
              >
                Xem kết quả
              </Link>
              :
              <></>
            }
          </PageHeaderSubtitle>
        </PageHeader>

        <br />
        <p style={{ margin: "0px", fontSize: "18px", display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}> Xem toàn bộ
          <Link
            target="_blank"
            underline="none"
            style={{ marginLeft: "15px" }}
            href={"https://" + project_data.project_ws_link}
          >
            <LaunchIcon color="primary" />
          </Link>
        </p>
        <br />
        <ProjectsTable
          usersJoined={project_data?.joins}
        />
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
    minWidth: "100px"
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
    marginBottom: "16px"
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
  templateDescription: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.text.secondary,
    textOverflow: "ellipsis",
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  disable: {
    pointerEvents: 'none'
  },
}))

