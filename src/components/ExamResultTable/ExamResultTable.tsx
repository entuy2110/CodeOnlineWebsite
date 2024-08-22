import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { FC } from "react"
import { ExamResultTableBody } from "./ExamResultTableBody"
import { ExamResult, Project } from "../../api/typesGenerated"
import { FullScreenLoader } from "components/Loader/FullScreenLoader"
import { useTranslation } from "react-i18next"

export interface ExamResultTableProps {
  project: Project
  result?: ExamResult[][]
}

export const ExamResultTable: FC<React.PropsWithChildren<ExamResultTableProps>> = ({
  project,
  result
}) => {
  console.log(result)
  const { t } = useTranslation("examResultPage")
  if (result && result.length > 0) {
    const example_result = result[0]

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="5%">{t("resultTable.index")}</TableCell>
              <TableCell width="20%">{t("resultTable.fullname")}</TableCell>
              <TableCell width="5%">{t("resultTable.point")}</TableCell>
              {example_result.map((data, index) => {
                return (
                  <TableCell key={`table${index}`} width="5%">{data.file_name}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <ExamResultTableBody
              project={project}
              result={result}
            />
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  return (<></>)
}
