import { FormControl, InputLabel,Select, MenuItem, makeStyles, TextField, Divider, Button } from "@material-ui/core";
import { getLanguagePackage } from "api/api";
import { ExamResult, Project } from "api/typesGenerated";
import { exec } from "child_process";
import { ExamResultTable } from "components/ExamResultTable/ExamResultTable";
import { HorizontalForm } from "components/Form/Form";
import { Margins } from "components/Margins/Margins";
import { PackageCard } from "components/PackageCard/PackageCard";
import { PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "components/PageHeader/PageHeader";
import { Stack } from "components/Stack/Stack";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useTranslation } from 'react-i18next'

export interface ExamResultPageViewProps {
  project: Project
  result?: ExamResult[][]
}

export const ExamResultPageView : FC<
  React.PropsWithChildren<ExamResultPageViewProps>
>  = ({
  project,
  result
}) => {
  const { t } = useTranslation("examResultPage")

  return (
    <Margins>
      <PageHeader>
        <PageHeaderTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <span>{t("title")} {project.desc}</span>
          </Stack>
        </PageHeaderTitle>
      </PageHeader>
      <ExamResultTable
        project={project}
        result={result}
      ></ExamResultTable>

    </Margins>
  )
}
