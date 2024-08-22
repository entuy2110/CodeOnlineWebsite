import { makeStyles } from "@material-ui/core/styles"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { combineClasses } from "util/combineClasses"
import AddIcon from "@material-ui/icons/AddOutlined"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import {
  Badge,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Select,
} from "@material-ui/core"
import React from "react"
import { useTranslation } from "react-i18next"
import { Exercise, Project, Visitor } from "api/typesGenerated"
import { EditTaskDialog } from "components/EditTaskDialog/EditTaskDialog"
import { checkParaphrase, deleteProject, getVisitors } from "api/api"
import { displayMsg, displaySuccess } from "components/GlobalSnackbar/utils"
import { Loader } from "components/Loader/Loader"
import { CheckVisitorDialog } from "components/CheckVisitorDialog/CheckVisitorDialog"
import { useMe_2 } from "hooks/useMe_2"

const ITEM_HEIGHT = 48

export interface TaskCardProps {
  sub_project: Project
  icon?: string
  className?: string
  onDeleteProject: (project_id: string) => void
  refetch: () => void
}

const checkVisitor = (visitors: Visitor[]) => {
  var check = false
  for (let i = 0; i < visitors.length; i++) {
    if (visitors[i].workspaceUsers.length > 1) {
      check = true
    }
  }
  return check
}

export const TaskCard: FC<TaskCardProps> = ({
  sub_project,
  icon,
  className,
  onDeleteProject,
  refetch,
}) => {
  const { t, i18n } = useTranslation("projectPage")
  const commonTranslation = useTranslation("common")
  const me_2 = useMe_2()
  const navigate = useNavigate()
  const styles = useStyles()
  const [disableShowChecking, setDisableShowChecking] = useState(false)
  const [showChecking, setShowChecking] = useState<JSX.Element>(
    <span> {t("taskCard.menu.plagiarismCheck")}</span>,
  )
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [dotBadge, setDotBadge] = useState(false)

  const [openEditTask, setOpenEditTask] = useState(false)
  const [openCheckVisitor, setOpenCheckVisitor] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const start_time = new Date(sub_project.start_date).getTime()
  const due_time = new Date(sub_project.due_date).getTime()
  const today = new Date().getTime()
  const timeDiff = due_time > today ? due_time - today : 0
  const day_diffs = timeDiff / (1000 * 60 * 60 * 24)

  let time_text = ""
  if (sub_project.due_date !== null) {
    if (day_diffs > 1) {
      time_text =
        `${t("taskCard.timeLeft")}: ` +
        Math.ceil(day_diffs) +
        " " +
        commonTranslation.t("date.days")
    } else if (day_diffs === 1) {
      time_text =
        `${t("taskCard.timeLeft")}: ` +
        Math.ceil(day_diffs) +
        " " +
        commonTranslation.t("date.day")
    } else if (day_diffs > 0) {
      time_text =
        `${t("taskCard.timeLeft")}: ` +
        Math.floor((timeDiff / (1000 * 60 * 60)) % 24) +
        (Math.floor((timeDiff / (1000 * 60 * 60)) % 24) <= 1 ? ` ${commonTranslation.t("date.hour")} ` : ` ${commonTranslation.t("date.hours")} `) +
        (Math.floor((timeDiff / (1000 * 60)) % 60) + 1) +
        ((Math.floor((timeDiff / (1000 * 60)) % 60) + 1) <= 1 ? ` ${commonTranslation.t("date.minute")}` : ` ${commonTranslation.t("date.minutes")}`) 
    } else {
      time_text = t("taskCard.expired")
    }
  }

  const is_disable_start_time =
    start_time > new Date().getTime() && sub_project.owner_id !== me_2.id

  const handleOpenEdit = () => {
    setOpenEditTask(true)
  }

  const handleCloseEdit = () => {
    setOpenEditTask(false)
  }

  const handleOpenCheckVisitor = () => {
    setOpenCheckVisitor(true)
  }

  const handleCloseCheckVisitor = () => {
    setOpenCheckVisitor(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setShowChecking(<span> {t("taskCard.menu.plagiarismCheck")}</span>)
    setDisableShowChecking(false)
    setAnchorEl(null)
  }

  if (sub_project.owner_id === me_2.id) {
    useEffect(() => {
      const interval = setInterval(() => {
        getVisitors(sub_project.name).then((res) => {
          setVisitors(res)
          if (checkVisitor(res)) {
            setDotBadge(true)
          }
        })
      }, 10000)
      return () => clearInterval(interval)
    }, [])
  }

  return (
    <div
      className={combineClasses([
        is_disable_start_time ? styles.disabled_template : styles.template,
        className,
      ])}
      key={sub_project.id}
    >
      <Link
        href={
          sub_project.submission || sub_project.owner_id === me_2.id
            ? sub_project.submission
            : ""
        }
        className={combineClasses([
          is_disable_start_time
            ? styles.disabledTemplateLink
            : styles.templateLink,
          className,
        ])}
        underline="none"
        target="_blank"
      >
        <div className={styles.templateIcon}>
          <img src={icon} alt="" />
        </div>
        <div className={styles.templateInfo}>
          <span className={styles.templateName}>{sub_project.desc}</span>
          {sub_project.start_date &&
            (start_time > new Date().getTime() ? (
              <span className={styles.templateDescription}>
                {t("taskCard.timeStart")}:{" "}
                {new Date(sub_project.start_date)
                  .toLocaleString(i18n.language, {
                    dateStyle: "full",
                    timeStyle: "short",
                  })
                  .replace("lúc ", "")}
              </span>
            ) : (
              <span className={styles.templateDescription}>
                {t("taskCard.hasStart")}
              </span>
            ))}

          {sub_project.due_date ? (
            <span className={styles.templateDescription}>{time_text}</span>
          ) : (
            <span className={styles.templateDescription}>
              {t("taskCard.noEndTime")}
            </span>
          )}
          <span style={{ whiteSpace: "pre-wrap" }}>{sub_project.title}</span>
        </div>
      </Link>
      {sub_project.owner_id === me_2.id && (
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            {/* <Badge color="primary" variant="dot" invisible={!dotBadge}> */}
            <MoreVertIcon />
            {/* </Badge> */}
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem
              key="Sửa"
              onClick={() => {
                navigate(`edit/${sub_project.name}`)
                // handleOpenEdit()
                handleClose()
              }}
            >
              {t("taskCard.menu.edit")}
            </MenuItem>
            <MenuItem
              key="Kiểm tra trùng lặp"
              onClick={async () => {
                setShowChecking(<CircularProgress size={23} />)
                if (disableShowChecking === false) {
                  setDisableShowChecking(true)
                  const url = await checkParaphrase(sub_project.name)
                  window.open(url)
                  handleClose()
                }
              }}
            >
              {showChecking}
            </MenuItem>
            <MenuItem
              key="Xem kết quả"
              onClick={async () => {
                navigate(`/exam_result/${sub_project.name}`)
              }}
            >
              {t("taskCard.menu.seeResult")}
            </MenuItem>
            {/* <Badge color="primary" variant="dot" invisible={!dotBadge}> */}
            {/* <MenuItem
              key="Check Visitor"
              onClick={async () => {
                handleOpenCheckVisitor()
                handleClose()
              }}
            >
              {t("taskCard.menu.accessHistory")}
            </MenuItem> */}
            {/* </Badge> */}
            <MenuItem
              key="Xóa"
              onClick={async () => {
                handleClose()
                await deleteProject(sub_project.id)
                displaySuccess(t("taskCard.menu.deleteSuccess"))
                refetch()
              }}
            >
              {t("taskCard.menu.delete")}
            </MenuItem>
          </Menu>
        </div>
      )}
      <CheckVisitorDialog
        onClose={handleCloseCheckVisitor}
        open={openCheckVisitor}
        visitors={visitors}
      />
      {/* <EditTaskDialog
        onClose={handleCloseEdit}
        open={openEditTask}
        project={sub_project}
        refetch={refetch}
      /> */}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  template: {
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
    marginBottom: "16px",
  },

  disabled_template: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    textDecoration: "none",
    textAlign: "left",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    height: "fit-content",
    marginBottom: "16px",
  },

  templateLink: {
    textDecoration: "none",
    textAlign: "left",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    height: "fit-content",
    width: "90%",
  },
  disabledTemplateLink: {
    textDecoration: "none",
    textAlign: "left",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    height: "fit-content",
    width: "90%",
    pointerEvents: "none",
  },

  templateIcon: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,

    "& img": {
      height: theme.spacing(4),
    },
  },

  templateInfo: {
    padding: theme.spacing(2, 2, 2, 0),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5),
    overflow: "hidden",
  },

  templateName: {
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
}))
