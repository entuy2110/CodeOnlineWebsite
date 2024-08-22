import { FormControl, InputLabel,Select, MenuItem, makeStyles, Button } from "@material-ui/core";
import { Margins } from "components/Margins/Margins";
import { PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "components/PageHeader/PageHeader";
import React from "react";
import { FC } from "react";
import { useTranslation } from 'react-i18next'

export interface SettingPageViewProps {
  changeLanguage: (language: string) => void
}

export const SettingPageView : FC<
  React.PropsWithChildren<SettingPageViewProps>
>  = ({
  changeLanguage,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation("settingPage")
  const [language, setLanguage] = React.useState(localStorage.getItem("language") !== null ? localStorage.getItem("language") : "en");

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
    changeLanguage(event.target.value)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Margins>
      <PageHeader>
        <PageHeaderTitle>
          {t("title")}
        </PageHeaderTitle>
        <PageHeaderSubtitle>
          {t("subTitle")}
        </PageHeaderSubtitle>
      </PageHeader>
      <FormControl className={classes.formControl}>
        <p> {t("language_select.title")} </p>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={language}
          onChange={handleChange}
        >
          <MenuItem value={"en"}>{t("language_select.en")}</MenuItem>
          <MenuItem value={"vi"}>{t("language_select.vi")}</MenuItem>
        </Select>
      </FormControl>


    </Margins>  
  )
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 300,
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing(1),
  },
}));