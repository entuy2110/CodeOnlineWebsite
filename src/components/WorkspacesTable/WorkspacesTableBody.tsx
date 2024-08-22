import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import AddOutlined from "@material-ui/icons/AddOutlined"
import { getUserResponse, Workspace } from "api/typesGenerated"
import { ChooseOne, Cond } from "components/Conditionals/ChooseOne"
import { TableEmpty } from "components/TableEmpty/TableEmpty"
import React, { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "react-router-dom"
import { TableLoaderSkeleton } from "../TableLoader/TableLoader"
import { WorkspacesRow } from "./WorkspacesRow"
import { useMe } from "hooks/useMe"
import { getUser, getJoinWorkspace, joinWorkspace } from "api/api"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export const useUserData = (user_id: string) => {
  const queryKey = ["user", user_id]
  const result = useQuery({
    queryKey,
    queryFn: () =>
    getUser(),
    refetchInterval: 5_000,
  })

  return {
    ...result,
  }
}

interface TableBodyProps {
  workspaces?: Workspace[]
  isUsingFilter: boolean
  onUpdateWorkspace: (workspace: Workspace) => void
  error?: Error | unknown
}

export const WorkspacesTableBody: FC<
  React.PropsWithChildren<TableBodyProps>
> = ({ workspaces, isUsingFilter, onUpdateWorkspace, error }) => {
  const { t } = useTranslation("workspacesPage")
  const styles = useStyles()
  const {data} = useUserData(useMe().id)

  if (error) {
    return <TableEmpty message={t("emptyResultsMessage")} />
  }

  if (!workspaces) {
    return <TableLoaderSkeleton columns={4} useAvatarData />
  }

  if (workspaces.length === 0) {
    return (
      <ChooseOne>
        <Cond condition={isUsingFilter}>
          <TableEmpty message={t("emptyResultsMessage")} />
        </Cond>

        <Cond>
          <TableEmpty
            className={styles.withImage}
            message={t("emptyCreateWorkspaceMessage")}
            description={t("emptyCreateWorkspaceDescription")}
            cta={
              <Link underline="none" component={RouterLink} to="/templates">
                <Button startIcon={<AddOutlined />}>
                  {t("createFromTemplateButton")}
                </Button>
              </Link>
            }
            image={
              <div className={styles.emptyImage}>
                <img src="/featured/workspaces.webp" alt="" />
              </div>
            }
          />
        </Cond>
      </ChooseOne>
    )
  }

  return (
    <>
      {workspaces.map((workspace) => (
        <WorkspacesRow
          workspace={workspace}
          key={workspace.id}
          onUpdateWorkspace={onUpdateWorkspace}
        />
      ))}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  withImage: {
    paddingBottom: 0,
  },
  emptyImage: {
    maxWidth: "50%",
    height: theme.spacing(34),
    overflow: "hidden",
    marginTop: theme.spacing(6),
    opacity: 0.85,

    "& img": {
      maxWidth: "100%",
    },
  },
}))
