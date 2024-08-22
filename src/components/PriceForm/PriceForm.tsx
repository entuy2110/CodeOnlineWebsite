import TextField from "@material-ui/core/TextField"
import { FormikContextType, FormikTouched, useFormik } from "formik"
import { FC, useEffect } from "react"
import { LoadingButton } from "../LoadingButton/LoadingButton"
import { Stack } from "../Stack/Stack"
import { PriceDialog } from "components/PriceDialog/PriceDialog"
import { useTranslation } from "react-i18next"
import React from "react"
import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useUserData } from "./data"
import { useAuth } from "components/AuthProvider/AuthProvider"
import { useMe_2 } from "hooks/useMe_2"
import { getPaymentMethod } from "api/api"
import { PaymentInfo } from "api/typesGenerated"


export interface PriceFormProps {
  paymentInfo: PaymentInfo
}

export const PriceForm: FC<React.PropsWithChildren<PriceFormProps>> = ({
  paymentInfo
}) => {
  const [_, authSend] = useAuth()
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState(1);  
  const commonTranslation = useTranslation("common")
  const me_2 = useMe_2()
  const userData = useUserData() 
  let due_date = new Date(me_2.due_date).getTime()

  useEffect(() => {
    if (userData.data) {
      if(new Date(userData.data.due_date).getTime() > due_date) {
        authSend({
          type: "UPDATE_USER_V2",
          data: userData.data
        })
      }
    }
  },[userData.data])

  const day_diffs = Math.ceil((due_date - new Date().getTime() ) / (1000 * 3600 * 24))

  let trial_days_text = ""
  if (day_diffs > 1) {
    trial_days_text = day_diffs + " " +  commonTranslation.t("date.days")
  } else if (day_diffs === 1) {
    trial_days_text = day_diffs + " " + commonTranslation.t("date.day")
  } else {
    trial_days_text = "0 " + commonTranslation.t("date.day")
  }

  const handleAdd = () => {
    setMonth(month + 1)
  }

  const handleMinus = () => {
    if (month > 1) {
      setMonth(month - 1)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let tmp = (month * paymentInfo.price).toString()
  let money = ""
  let count = 2
  for (let i = tmp.length - 1; i >= 0; i--) {
    if (i === 0 ) {
      money = tmp[i] + money
    }
    else {
      if (count === 0) {
        money = "," + tmp[i] + money
        count = 2
      }
      else {
        count--
        money = tmp[i] + money
      }
    } 
  }

  const [addCounter, setAddCounter] = React.useState<NodeJS.Timeout | null>();  

  const startAddCounter = () => {
    if (addCounter) return;
    setAddCounter(setInterval(() => {
      setMonth((month) => month + 1)
    }, 150))
  };

  const stopAddCounter = () => {
    if (addCounter) {
      clearInterval(addCounter)
      setAddCounter(null)
    }
  };

  const [minusCounter, setMinusCounter] = React.useState<NodeJS.Timeout | null>();  

  const startMinusCounter = () => {
    if (minusCounter) return;
    setMinusCounter(setInterval(() => {
      setMonth((month) => (month - 1) > 1 ? (month - 1) : 1)
    }, 150))
  };

  const stopMinusCounter = () => {
    if (minusCounter) {
      clearInterval(minusCounter)
      setMinusCounter(null)
    }
  };

  return (
    <>
      <TableContainer >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Số tháng</TableCell>
            <TableCell width="15%" align="left">Số tiền</TableCell>
            <TableCell width="3%" align="left"></TableCell>
            <TableCell width="30%" align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{paddingLeft: "10px"}} >
              <Button
                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}
                onClick={handleMinus}
                onMouseDown={startMinusCounter}
                onMouseUp={stopMinusCounter}
              >
                <RemoveIcon
                  style={{maxWidth: '15px', maxHeight: '15px', minWidth: '15px', minHeight: '15px'}}
                ></RemoveIcon>
              </Button>
              &nbsp;&nbsp;&nbsp;{month}&nbsp;&nbsp;&nbsp;
              <Button
                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}
                onClick={handleAdd}
                onMouseDown={startAddCounter}
                onMouseUp={stopAddCounter}
              >
                <AddIcon
                  style={{maxWidth: '15px', maxHeight: '15px', minWidth: '15px', minHeight: '15px'}}
                ></AddIcon>
              </Button>
            </TableCell>
            <TableCell width="15%" align="left">
              {money}&nbsp;
            </TableCell>
            <TableCell width="3%" align="left">
              VND
            </TableCell>
            <TableCell width="30%" align="right">
              <LoadingButton
              loading={false}
              variant="contained"
              onClick={handleClickOpen}
              >
                {false ? "" : "Gia hạn"}
              </LoadingButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    <PriceDialog 
      open={open} 
      onClose={handleClose}
      money={month * paymentInfo.price}
      moneyDisplay={money}
      paymentInfo={paymentInfo}
      months={month}
    />


    </>
  )
}
