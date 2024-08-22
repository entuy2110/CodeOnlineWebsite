import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { FC } from "react"
import { ProjectsTableBody } from "./ProjectTableBody"
import { UsersJoined } from "../../api/typesGenerated"
import { useTranslation } from "react-i18next"

export const Language = {
  usernameLabel: "Project Name",
  accessCode: "Access Code",
  owner: "Owner",
  ownerRole: "Role",
  codePath: "Last Seen",
}

export interface ProjectsTableProps {
  usersJoined?: UsersJoined[],
}

export const ProjectsTable: FC<React.PropsWithChildren<ProjectsTableProps>> = ({
  usersJoined
}) => {
  const { t } = useTranslation("projectPage")

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="5%">{t("table.index")}</TableCell>
            <TableCell width="20%">{t("table.user")}</TableCell>
            <TableCell width="25%">{t("table.email")}</TableCell>
            <TableCell width="15%">{t("table.role")}</TableCell>
            <TableCell width="20%">{t("table.lastSeen")}</TableCell>
            <TableCell width="15%">{t("table.linkWorkspace")}</TableCell>

            {/* 1% is a trick to make the table cell width fit the content */}
            {/* {canEditUsers && <TableCell width="1%" />} */}
          </TableRow>
        </TableHead>
        <TableBody>
          <ProjectsTableBody
            usersJoined={usersJoined}
          />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
