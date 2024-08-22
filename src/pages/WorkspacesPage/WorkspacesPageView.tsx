import Link from "@material-ui/core/Link"
import { JoinWorkspaceResponse, Workspace } from "api/typesGenerated"
import { AlertBanner } from "components/AlertBanner/AlertBanner"
import { Maybe } from "components/Conditionals/Maybe"
import { PaginationWidgetBase } from "components/PaginationWidget/PaginationWidgetBase"
import { FC } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Margins } from "../../components/Margins/Margins"
import {
  PageHeader,
  PageHeaderSubtitle,
  PageHeaderTitle,
} from "../../components/PageHeader/PageHeader"
import { SearchBarWithFilter } from "../../components/SearchBarWithFilter/SearchBarWithFilter"
import { Stack } from "../../components/Stack/Stack"
import { WorkspaceHelpTooltip } from "../../components/Tooltips"
import { WorkspacesTable } from "../../components/WorkspacesTable/WorkspacesTable"
import { workspaceFilterQuery } from "../../util/filters"

import { HorizontalForm, FormFields} from "../../components/Form/Form"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/AddOutlined"
import { IconButton, InputAdornment, TextField, makeStyles } from "@material-ui/core"
import { useFormik } from "formik"
import { BorderAll } from "@material-ui/icons"
import { borderRadius } from "theme/constants"
import axios from "axios"
import { values } from "lodash"
import { useMe } from "hooks/useMe"
import { joinWorkspace, getUser } from "api/api"
import { WorkspaceCard } from "../../components/WorkspaceCard/WorkspaceCard"

export const Language = {
  pageTitle: "Workspaces",
  yourWorkspacesButton: "Your workspaces",
  allWorkspacesButton: "All workspaces",
  runningWorkspacesButton: "Running workspaces",
  createANewWorkspace: `Create a new workspace from a `,
  template: "Template",
}

export interface WorkspacesPageViewProps {
  joinWorkspaces: JoinWorkspaceResponse[]
  error: unknown
  workspaces?: Workspace[]
  count?: number
  page: number
  limit: number
  filter: string
  onPageChange: (page: number) => void
  onFilter: (query: string) => void
  onUpdateWorkspace: (workspace: Workspace) => void
}

export const WorkspacesPageView: FC<
  React.PropsWithChildren<WorkspacesPageViewProps>
> = ({
  workspaces,
  error,
  filter,
  page,
  limit,
  count,
  joinWorkspaces,
  onFilter,
  onPageChange,
  onUpdateWorkspace,
}) => {
  const presetFilters = [
    { query: workspaceFilterQuery.me, name: Language.yourWorkspacesButton },
    { query: workspaceFilterQuery.all, name: Language.allWorkspacesButton },
    {
      query: workspaceFilterQuery.running,
      name: Language.runningWorkspacesButton,
    },
  ]
  const styles = useStyles()
  const me = useMe()

  const form = useFormik({
    initialValues: {
      access_code: '',
    },
    onSubmit: async (data) => {
      joinWorkspace(data.access_code, me.id)
    },
  })

  return (
    <Margins>
      <PageHeader
        actions={
          // <HorizontalForm onSubmit={form.handleSubmit}>
          //   <div> 
          //     <TextField
          //       id="access_code"
          //       name="access_code"
          //       label="Access code"
          //       variant="outlined"
          //       onChange={form.handleChange}
          //     />
          //     <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          //     <Button type="submit" variant="contained" style={{marginTop: "8px"}} >Join Workspace</Button>
          //   </div>   
          // </HorizontalForm>
          <Button startIcon={<AddIcon />} component={RouterLink} to="create-project">Create Project</Button>

        }
      >
        <PageHeaderTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <span>{Language.pageTitle}</span>
            <WorkspaceHelpTooltip />

          </Stack>
        </PageHeaderTitle>

        <PageHeaderSubtitle>
          {Language.createANewWorkspace}
          <Link component={RouterLink} to="/templates">
            {Language.template}
          </Link>
          .
        </PageHeaderSubtitle>
      </PageHeader>

      <Stack>
        <Maybe condition={Boolean(error)}>
          <AlertBanner
            error={error}
            severity={
              workspaces !== undefined && workspaces.length > 0
                ? "warning"
                : "error"
            }
          />
        </Maybe>

        {/* <SearchBarWithFilter
          filter={filter}
          onFilter={onFilter}
          presetFilters={presetFilters}
          error={error}
        /> */}
      </Stack>
      
      <Stack direction="row" spacing={4}>

        <div className={styles.templates}>
          {workspaces?.map((workspace) => (
            <WorkspaceCard
              icon = {workspace.template_icon}
              workspace_name= {workspace.name}
              owner= {workspace.owner_name}
              workspace_id= {workspace.id}
              key={workspace.id}
            />
          ))}
          
        </div>
      </Stack>

      {/* <WorkspacesTable
        workspaces={workspaces}
        isUsingFilter={filter !== workspaceFilterQuery.me}
        onUpdateWorkspace={onUpdateWorkspace}
        error={error}
      /> */}
      {count !== undefined && (
        <PaginationWidgetBase
          count={count}
          limit={limit}
          onChange={onPageChange}
          page={page}
        />
      )}
    </Margins>
  )
}
const useStyles = makeStyles((theme) => ({
  filter: {
    width: theme.spacing(26),
    flexShrink: 0,
  },

  filterCaption: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: 12,
    color: theme.palette.text.secondary,
    letterSpacing: "0.1em",
  },

  tagLink: {
    color: theme.palette.text.secondary,
    textDecoration: "none",
    fontSize: 14,
    textTransform: "capitalize",

    "&:hover": {
      color: theme.palette.text.primary,
    },
  },

  tagLinkActive: {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },

  templates: {
    flex: "1",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: theme.spacing(2),
    gridAutoRows: "min-content",
  },
}))
