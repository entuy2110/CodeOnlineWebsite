import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { FC } from "react"
import { VisitorsTableBody } from "./VisitorsTableBody"
import { UsersJoined, Visitor } from "../../api/typesGenerated"
import { useTranslation } from "react-i18next"

export interface VisitorsTableProps {
  visitors: Visitor[]
}

export const VisitorsTable: FC<React.PropsWithChildren<VisitorsTableProps>> = ({
  visitors
}) => {
  const { t } = useTranslation("projectPage")

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="20%">Địa chỉ IP truy cập</TableCell>
            <TableCell width="25%">Người dùng đăng nhập</TableCell>
            <TableCell width="5%"></TableCell>
            <TableCell width="25%">Workspace đã truy cập</TableCell>
            <TableCell width="25%">Thời gian</TableCell>

            {/* 1% is a trick to make the table cell width fit the content */}
            {/* {canEditUsers && <TableCell width="1%" />} */}
          </TableRow>
        </TableHead>
        <TableBody>
          <VisitorsTableBody
            visitors={visitors}
          />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
