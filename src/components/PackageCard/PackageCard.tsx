import { makeStyles } from "@material-ui/core/styles"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { combineClasses } from "util/combineClasses"
import AddIcon from "@material-ui/icons/AddOutlined"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem, Select } from "@material-ui/core"
import React from "react"
import { useTranslation } from "react-i18next"

export interface PackageCardProps {
  package_name: string
  version: string
}

const ITEM_HEIGHT = 48;

export const PackageCard: FC<PackageCardProps> = ({
  version,
  package_name,
}) => {
  const styles = useStyles()

  return (
    <div
      className={styles.template}
    >
      <div
        className={styles.templateLink}
      >
        <div className={styles.templateInfo}>
          <span className={styles.templateName}>{package_name}</span>
          <span className={styles.templateDescription}>
            {version}
          </span>
        </div>
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
    margin: theme.spacing(0, 3, 1, 1)
  },

  templateLink: {
    textDecoration: "none",
    textAlign: "left",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    height: "fit-content",
    width: "100%",
  },

  templateInfo: {
    padding: theme.spacing(2, 2, 2, 3),
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
