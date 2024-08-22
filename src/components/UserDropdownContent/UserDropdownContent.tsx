import Divider from "@material-ui/core/Divider"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles } from "@material-ui/core/styles"
import AccountIcon from "@material-ui/icons/AccountCircleOutlined"
import SettingsIcon from '@material-ui/icons/Settings';
import { Stack } from "components/Stack/Stack"
import { FC } from "react"
import { Link } from "react-router-dom"
import * as TypesGen from "../../api/typesGenerated"
import LogoutIcon from "@material-ui/icons/ExitToAppOutlined"
import { useTranslation } from "react-i18next";
import { useMe } from "hooks/useMe";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { useMe_2 } from "hooks/useMe_2";

export interface UserDropdownContentProps {
  user: TypesGen.User
  buildInfo?: TypesGen.BuildInfoResponse
  supportLinks?: TypesGen.LinkConfig[]
  onPopoverClose: () => void
  onSignOut: () => void
  user_2: TypesGen.User_2
  isTrial: boolean
}

export const UserDropdownContent: FC<UserDropdownContentProps> = ({
  buildInfo,
  user,
  user_2,
  supportLinks,
  isTrial,
  onPopoverClose,
  onSignOut,
}) => {
  const { t } = useTranslation("navbar")
  const commonTranslation = useTranslation("common")
  const styles = useStyles()
  const me_2 = useMe_2()

  let due_date = new Date(me_2.due_date).getTime()

  const day_diffs = Math.ceil((due_date - new Date().getTime() ) / (1000 * 3600 * 24))

  let trial_days_text = ""
  if (day_diffs > 1) {
    trial_days_text = day_diffs + " " +  commonTranslation.t("date.days")
  } else if (day_diffs === 1) {
    trial_days_text = day_diffs + " " + commonTranslation.t("date.day")
  } else {
    trial_days_text = "0 " + commonTranslation.t("date.day")
  }

  return (
    <div>
      <Stack className={styles.info} spacing={0}>
        <span className={styles.userName}>{user_2.fullname}</span>
        <span className={styles.userEmail}>{user.email}</span>
      </Stack>

      <Divider className={styles.divider} />

      <Link to="/settings/account" className={styles.link}>
        <MenuItem className={styles.menuItem} onClick={onPopoverClose}>
          <AccountIcon className={styles.menuItemIcon} />
          <span className={styles.menuItemText}>{t("userDropdown.account")}</span>
        </MenuItem>
      </Link>

      <Link to="/setting" className={styles.link}>
        <MenuItem className={styles.menuItem} onClick={onPopoverClose}>
          <SettingsIcon className={styles.menuItemIcon} />
          <span className={styles.menuItemText}>{t("userDropdown.setting")}</span>
        </MenuItem>
      </Link>

      <MenuItem className={styles.menuItem} onClick={onSignOut}>
        <LogoutIcon className={styles.menuItemIcon} />
        <span className={styles.menuItemText}>{t("userDropdown.signOut")}</span>
      </MenuItem>

      <Divider className={styles.divider} />
      
      {isTrial && (
        <MenuItem className={styles.menuItem} onClick={onPopoverClose}>
          <QueryBuilderIcon className={styles.menuItemIcon} />
          <span className={styles.menuItemText}>{t("userDropdown.trialDays")}: {trial_days_text}</span>
        </MenuItem>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  info: {
    padding: theme.spacing(2.5),
  },
  userName: {
    fontWeight: 600,
  },
  userEmail: {
    color: theme.palette.text.secondary,
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  menuItem: {
    gap: theme.spacing(2.5),
    padding: theme.spacing(1, 2.5),

    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      transition: "background-color 0.3s ease",
    },
  },
  menuItemIcon: {
    color: theme.palette.text.secondary,
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
  menuItemText: {
    fontSize: 14,
  },
  divider: {
    margin: theme.spacing(1, 0),

    "&:first-of-type": {
      marginTop: 0,
    },

    "&:last-of-type": {
      marginBottom: 0,
    },
  },
  footerText: {
    fontSize: 12,
    textDecoration: "none",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    gap: 4,

    "& svg": {
      width: 12,
      height: 12,
    },
  },
  buildInfo: {
    color: theme.palette.text.primary,
  },
}))

const includeBuildInfo = (
  href: string,
  buildInfo?: TypesGen.BuildInfoResponse,
): string => {
  return href.replace(
    "{CODER_BUILD_INFO}",
    `${encodeURIComponent(
      `Version: [\`${buildInfo?.version}\`](${buildInfo?.external_url})`,
    )}`,
  )
}
