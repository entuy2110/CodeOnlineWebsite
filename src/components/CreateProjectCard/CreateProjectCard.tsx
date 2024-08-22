import { Button, TextField, colors } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { FC } from "react"
import { Link } from "react-router-dom"
import { combineClasses } from "util/combineClasses"

export interface CreateProjectCardProps {
  id: string
  name: string
  icon: string
  className?: string
  checked: boolean
  onClick: () => void
}

export const CreateProjectCard: FC<CreateProjectCardProps> = ({
  id,
  name,
  icon,
  className,
  checked,
  onClick,
}) => {
  const styles = useStyles()
  return (
    <button
      className={combineClasses([styles.template, className])}
      onClick={onClick}
      key={id}
      type="submit"
      // style={checked ? {borderColor: "hsl(215, 81%, 63%)", backgroundColor: "#424242"} : {}}
    > 
      <div className={styles.templateIcon}>
        <img src={icon} alt="icon" />
      </div>
      <div className={styles.templateInfo}>
        <span className={styles.templateName}>{name}</span>
        {/* <span className={styles.templateDescription}>
          No description
        </span> */}
      </div>
    </button>
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
