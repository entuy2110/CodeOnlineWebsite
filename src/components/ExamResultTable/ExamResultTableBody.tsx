import { TableRow, TableCell } from "@material-ui/core"
import { ExamResult, Exercise, Project } from "api/typesGenerated"
import { LastUsed } from "components/LastUsed/LastUsed"
import { Pill } from "components/Pill/Pill"
import { FC } from "react"
import { Link } from "react-router-dom"

interface ExamResultTableBodyProps {
  project: Project
  result: ExamResult[][]
}

export const ExamResultTableBody: FC<
  React.PropsWithChildren<ExamResultTableBodyProps>
> = ({ project, result }) => {
  const testcases: Exercise[] = JSON.parse(project.testcase)
  var max_point = 0
  testcases.map((testcase) => {
    if (testcase.point) {
      max_point += testcase.point
    }
  })


  return (
    <>
      {result.map((user, index) => {
        var point = 0
        user.map((data) => {
          const user_result = JSON.parse(data.result)
          if (user_result.score) {
            point += user_result.score
          }
        })

        return (
          <TableRow key={`row${index}`}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user[0].fullname}</TableCell>
            <TableCell>{point}/{max_point}</TableCell>
            {user.map((data, userDataIndex) => {
              const user_result = JSON.parse(data.result)
              if (testcases[userDataIndex].point) {
                return (
                  <TableCell key={`${data.user_id}_${userDataIndex}`}>{user_result.score}/{testcases[userDataIndex].point}</TableCell>
                )
              } else {
                return (
                  <TableCell key={`${data.user_id}_${userDataIndex}`}>0/0</TableCell>
                )
              }
            })}
          </TableRow>
        )
      })}
    </>
  )
}
