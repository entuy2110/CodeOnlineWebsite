import { makeStyles } from "@material-ui/core/styles"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { combineClasses } from "util/combineClasses"
import AddIcon from "@material-ui/icons/AddOutlined"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem, Select } from "@material-ui/core"
import React from "react"
import { useTranslation } from "react-i18next"

export interface ProjectCardProps {
  icon?: string
  project_name: string
  project_desc: string
  project_id: string
  owner?: string
  className?: string
  onDeleteProject: (project_id: string) => void
}

export interface AddProjectCardProps {
  link: string
}

const ITEM_HEIGHT = 48;

export const AddProjectCard: FC<AddProjectCardProps> = ({
  link,
}) => {
  const { t } = useTranslation("projectsPage")
  const styles = useStyles()
  return (
    <Link
      to={link}
      className={styles.template}
    >
      <div className={styles.templateIcon}>
        <AddIcon />
      </div>
      <div className={styles.templateInfo}>
        <span className={styles.templateName}>{t("createProject")}</span>
      </div>
      
    </Link>
  )
}

export const ProjectCard: FC<ProjectCardProps> = ({
  icon,
  project_desc,
  project_name,
  owner,
  project_id,
  className,
  onDeleteProject,
}) => {
  const { t } = useTranslation("projectsPage")
  const navigate = useNavigate()
  const styles = useStyles()
  const projectPageLink = `/@${owner}/${project_name}`


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className={combineClasses([styles.template, className])}
      key={project_id}
    >
      <Link
        to={projectPageLink}
        className={combineClasses([styles.templateLink, className])}
      >
        <div className={styles.templateIcon}>
          <img src={icon} alt="" />
        </div>
        <div className={styles.templateInfo}>
          <span className={styles.templateName}>{project_desc}</span>
          <span className={styles.templateDescription}>
            {t("owner")}: {owner}
          </span>
        </div>
      </Link>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem key="Sửa" onClick={() => {
              navigate(`edit/${project_name}`)
              handleClose
            }}>
            {t("edit")}
          </MenuItem>
          <MenuItem key="Xóa" onClick={() => {
            handleClose
            onDeleteProject(project_id)
          }
            }>
            {t("delete")}
          </MenuItem>
        </Menu>
      </div>
            
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
