import { makeStyles } from "@material-ui/core/styles"
import { FC } from "react"
import { Link } from "react-router-dom"
import { combineClasses } from "util/combineClasses"

export interface WorkspaceCardProps {
  icon?: string
  workspace_name: string
  workspace_id: string
  owner: string
  className?: string
}

export const WorkspaceCard: FC<WorkspaceCardProps> = ({
  icon,
  workspace_name,
  owner,
  workspace_id,
  className,
}) => {
  const styles = useStyles()
  const random = Math.floor(Math.random() * 899998) + 100001;
  const workspacePageLink = `/@${owner}/workspace/${workspace_name}-${random}`
  return (
    <Link
      to={workspacePageLink}
      className={combineClasses([styles.template, className])}
      key={workspace_id}
    >
      <div className={styles.templateIcon}>
        <img src={icon} alt="" />
      </div>
      <div className={styles.templateInfo}>
        <span className={styles.templateName}>{workspace_name}</span>
        <span className={styles.templateDescription}>
          {owner}
        </span>
      </div>
    </Link>
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
