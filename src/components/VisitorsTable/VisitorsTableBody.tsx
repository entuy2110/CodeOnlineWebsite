import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { ChooseOne, Cond } from "components/Conditionals/ChooseOne"
import { LastUsed } from "components/LastUsed/LastUsed"
import { Pill } from "components/Pill/Pill"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as TypesGen from "../../api/typesGenerated"
import { combineClasses } from "../../util/combineClasses"
import { AvatarData } from "../AvatarData/AvatarData"
import { EmptyState } from "../EmptyState/EmptyState"
import { TableLoaderSkeleton } from "../TableLoader/TableLoader"
import { TableRowMenu } from "../TableRowMenu/TableRowMenu"
import { EditRolesButton } from "components/EditRolesButton/EditRolesButton"
import { Stack } from "components/Stack/Stack"
import LaunchIcon from '@material-ui/icons/Launch';

import { UsersJoined } from "../../api/typesGenerated"
import { Link, TableBody } from "@material-ui/core"
import { useMe } from "hooks/useMe"
import { getVisitors } from "api/api"

interface VisitorsTableBodyProps {
  visitors: TypesGen.Visitor[],
}

export const VisitorsTableBody: FC<
  React.PropsWithChildren<VisitorsTableBodyProps>
> = ({
  visitors,
}) => {
    const styles = useStyles()
    const { t } = useTranslation("usersPage")
    const [jsx, setJsx] = useState<JSX.Element[]>([])

    useEffect(() => {
      for (let i = 0; i < visitors.length; i++) {
        const length = visitors[i].loginUsers.length > visitors[i].workspaceUsers.length ? visitors[i].loginUsers.length : visitors[i].workspaceUsers.length
        for (let j = 0; j < length; j++) {
          if (j === 0) {
            const jsx_tmp =
              <TableRow key={j}>
                <TableCell rowSpan={length + 1} >{visitors[i].ip}</TableCell>
                {visitors[i].loginUsers[j] ?
                  <>
                    <TableCell style={{ paddingLeft: "8px" }}>{visitors[i].loginUsers[j].fullname}</TableCell>
                    <TableCell style={{ borderBottom: "none" }}></TableCell>
                  </>
                  :
                  <>
                    <TableCell style={{ paddingLeft: "8px" }}></TableCell>
                    <TableCell style={{ borderBottom: "none" }}></TableCell>
                  </>
                }

                {visitors[i].workspaceUsers[j] ?
                  <>
                    <TableCell >{visitors[i].workspaceUsers[j].owner_name}</TableCell>
                    <TableCell >
                      {new Date(visitors[i].workspaceUsers[j].time).toLocaleTimeString('vi-VI', {minute: "2-digit", hour: "2-digit"})},&nbsp;
                      {new Date(visitors[i].workspaceUsers[j].time).toLocaleString('vi-VI', { dateStyle: "long"})}
                    </TableCell>
                  </>
                  :
                  <>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>                  
                  </>
                }
              </TableRow>
            setJsx((jsx) => [...jsx, jsx_tmp])
          } else {
            const jsx_tmp =
            <TableRow key={j}>
            {visitors[i].loginUsers[j] ?
              <>
                <TableCell style={{ paddingLeft: "8px" }}>{visitors[i].loginUsers[j].fullname}</TableCell>
                <TableCell style={{ borderBottom: "none" }}></TableCell>
              </>
              :
              <>
                <TableCell style={{ paddingLeft: "8px" }}></TableCell>
                <TableCell style={{ borderBottom: "none" }}></TableCell>
              </>
            }

            {visitors[i].workspaceUsers[j] ?
              <>
                <TableCell >{visitors[i].workspaceUsers[j].owner_name}</TableCell>
                <TableCell >
                  {new Date(visitors[i].workspaceUsers[j].time).toLocaleTimeString('vi-VI', {minute: "2-digit", hour: "2-digit"})},&nbsp;
                  {new Date(visitors[i].workspaceUsers[j].time).toLocaleString('vi-VI', { dateStyle: "long"})}
                </TableCell>
              </>
              :
              <>
                <TableCell ></TableCell>
                <TableCell ></TableCell>                  
              </>
            }
          </TableRow>
            setJsx((jsx) => [...jsx, jsx_tmp])
          }
        }
      }
    }, [])
    return (
      <>
      {jsx}
        {/* {visitors && visitors.map((visitor: any , index: number) => {
        return (
          <TableRow key={index}>
            <TableCell>{visitor.ip}</TableCell>
            <TableCell>{visitor.fullname}</TableCell>
            <TableCell>{visitor.owner_name}</TableCell>
            <TableCell>
            {new Date(visitor.login_time).toLocaleTimeString('vi-VI', {minute: "2-digit", hour: "2-digit"})},&nbsp;
            {new Date(visitor.login_time).toLocaleString('vi-VI', { dateStyle: "long"})}
            </TableCell>
          </TableRow>
        )
      })} */}
        {/* <TableRow>
          <TableCell rowSpan={4} >127.0.0.1</TableCell>
          <TableCell style={{ paddingLeft: "8px" }}>Nguyen duc vinh</TableCell>
          <TableCell style={{ borderBottom: "none" }}></TableCell>
          <TableCell >Nguyen duc </TableCell>
          <TableCell >
            18-21-2001-222-11
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell style={{ paddingLeft: "8px" }}>Nguyen duc vinh</TableCell>
          <TableCell style={{ borderBottom: "none" }}></TableCell>
          <TableCell >Nguyen duc </TableCell>
          <TableCell >
            18-21-2001-222-11
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell style={{ paddingLeft: "8px" }}></TableCell>
          <TableCell style={{ borderBottom: "none" }}></TableCell>
          <TableCell >Nguyen duc </TableCell>
          <TableCell >
            18-21-2001-222-11
          </TableCell>
        </TableRow> */}
      </>
    )
  }

const useStyles = makeStyles((theme) => ({
  no_border: {
    borderBottom: "none"
  }
}))
