import { Switch, Tooltip, Typography } from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { FC } from "react"
import InfoIcon from "@material-ui/icons/Info"
import { useTranslation } from "react-i18next"

export interface ToggleSwitchProps {
  checked: boolean
  onChange: (check: boolean) => void
}

const StyledTooltip = withStyles({
  tooltip: {
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "hsl(0deg 0% 94.96%)",
  },
})(Tooltip)

const htmlTooltip = (
  <div style={{ display: "flex" }}>
    <InfoIcon color="primary" fontSize="small" />
    &nbsp;&nbsp;
    <Typography style={{ fontSize: "14px" }}>Thay đổi quyền</Typography>
  </div>
)

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  const { t } = useTranslation("projectPage")
  const classes = useStyles()

  const handleChange = (event: any) => {
    onChange(event.target.checked)
  }

  return (
    <div>
      {/* <StyledTooltip title={htmlTooltip} placement="top" leaveDelay={1000} > */}
      <Switch
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        className={checked ? classes.true : classes.false}
        checked={checked}
        onChange={handleChange}
        name="checked"
        inputProps={{
          "aria-label": "secondary checkbox",
          style: { width: "160px", left: "-70px" },
        }}
      />
      {/* </StyledTooltip> */}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90px",
    height: "24px",
    padding: "0px 0px 1px 1px",
  },
  switchBase: {
    color: "#CA0000",
    padding: "0px 1px 1px 1px",
    "&$checked": {
      "& + $track": {
        backgroundColor: "#23bf58",
      },
    },
  },
  thumb: {
    color: "white",
    width: "20px",
    height: "20px",
    margin: "1px",
  },
  track: {
    borderRadius: "20px",
    backgroundColor: "#CA0000",
    opacity: "1 !important",
  },
  checked: {
    color: "#23bf58 !important",
    transform: "translateX(66px) !important",
  },
  true: {
    "&:after, &:before": {
      color: "white",
      fontSize: "11px",
      position: "absolute",
      top: "-5px",
    },
    "&:after": {
      content: `"Public"`,
      left: "20px",
    },
  },
  false: {
    "&:after, &:before": {
      color: "white",
      fontSize: "11px",
      position: "absolute",
      top: "-5px",
    },
    "&:before": {
      content: `"Private"`,
      right: "20px",
    },
  },

  tooltip: {
    color: "green",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))
