import React, { FC, useEffect, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Divider } from '@material-ui/core';
import { capturePayPalOrder, createPayPalOrder, payWithQR } from 'api/api';
import { useMe_2 } from 'hooks/useMe_2';
import { PaymentInfo, User_2 } from 'api/typesGenerated';
import { Loader } from 'components/Loader/Loader';
import Button from "@material-ui/core/Button"

import {makeStyles} from '@material-ui/core';
import { PayPalButtons, PayPalButtonsComponentProps } from '@paypal/react-paypal-js';
import axios from 'axios';

export interface PriceDialogProps {
  open: boolean,
  money: number,
  moneyDisplay: string,
  paymentInfo: PaymentInfo,
  onClose: () => void,
  months: number
}

export const PriceDialog: FC<React.PropsWithChildren<PriceDialogProps>> = ({
  open,
  money,
  moneyDisplay,
  paymentInfo,
  onClose,
  months
}) => {
  const me_2 = useMe_2()
  // const [time, setTime] = React.useState(300);
  const [check, setCheck] = React.useState(true);
  const [imageURL, setImageURL] = React.useState("");
  let timeCounter: string | number | NodeJS.Timeout | undefined

  // useEffect(() => {
  //   if (open === true) {
  //     payWithQR(money, me_2.username, paymentInfo.bin, paymentInfo.number, paymentInfo.account).then((res) => {
  //       setImageURL(res.data.qrDataURL)
  //     })
  //   }
  //   if (check === true) {
  //     setCheck(false)
  //     // timeCounter = setInterval(() => {
  //     //   setTime((time) => (time - 1) > 0 ? (time - 1) : 0)
  //     // }, 1000)
  //     // if (timeCounter) {
  //     //   setTimeout(() => {
  //     //     stopTimeCounter()
  //     //   }, 301000)
  //     // }
  //     // const stopTimeCounter = () => {
  //     //   if (timeCounter) {
  //     //     clearInterval(timeCounter)
  //     //     handleClose()
  //     //     setTime(300)
  //     //     setCheck(true)
  //     //   }
  //     // };
  //   }
  // }, [open])

  // let minutes = (Math.floor(time / 60)).toString()
  // let seconds = (time % 60).toString()
  // minutes = minutes.padStart(2, "0")
  // seconds = seconds.padStart(2, "0")

  const handleClose = () => {
    setImageURL("")
    setPaymentStage("paymentMethod")
    onClose();
  };

  const handleQRpay = () => {
    setPaymentStage("qr")
    payWithQR(money, me_2.username, paymentInfo.bin, paymentInfo.number, paymentInfo.account).then((res) => {
      setImageURL(res.data.qrDataURL)
    })
  }

  const handlePaypal = () => {
    setPaymentStage("paypal")
  }

  const handlePayPayOrder: PayPalButtonsComponentProps["createOrder"] = async (data, actions) => {
    const res = await createPayPalOrder(me_2.id, months)
    if (res.status === "created")
      return res.data.id
    
    setPaymentStage("failed")
  }

  const onPaypalApprove: PayPalButtonsComponentProps["onApprove"] = async (data, actions) => {
    const res = await capturePayPalOrder(data.orderID)
    if (res.status === "completed") setPaymentStage("completed")
    else setPaymentStage("failed")
  }

  const styles = useStyles();

  const [paymentStage, setPaymentStage] = useState("paymentMethod");


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true} >
      <DialogTitle id="simple-dialog-title">Thanh toán</DialogTitle>
      <Divider />
      { paymentStage === "paymentMethod" &&
        <div className={styles.paymentMedthods}>
          <Button onClick={handleQRpay}>
            QRpay
          </Button>
          <Button onClick={handlePaypal}>
            Paypal
          </Button>

        </div>
      }
      { paymentStage === "qr" && (
        <div className={styles.qrForm}>
          <div style={{ flex: 1 }}>
            {imageURL ? 
              <img src={imageURL} style={{ width: "75%", marginLeft: "auto", marginRight: "auto", display: "block" }}></img>
              :
              <Loader/>
            }
              <p style={{ textAlign: "center" }}>Tổng số tiền: {moneyDisplay} đ</p>
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ textAlign: "center" }}>Quét mã QR để thanh toán</h2>
            <p>Ngân hàng: {paymentInfo.bank}</p>
            <p>Số tài khoản: {paymentInfo.number}</p>
            <p>Tên tài khoản: {paymentInfo.account}</p>

            {/* <div style={{ width: "50%" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "16px" }}>Giao dịch kết thúc sau {minutes} : {seconds}</p>
              </div>
            </div> */}
          </div>
        </div>)
      }
      { paymentStage === "paypal" && (
        <div className={styles.paypal}>
          <PayPalButtons createOrder={handlePayPayOrder} onApprove={onPaypalApprove} style={{ layout: "vertical"}} />
        </div>
        )
      }
      {
        paymentStage === "failed" && (
          <div>
            failed
          </div>
        )
      }
      {
        paymentStage === "completed" && (
          <div>
            completed
          </div>
        )
      }
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  paymentMedthods: {
    display: 'flex',
    flexDirection: "column",
    gap: '10px',
    padding: '10px'
  },
  qrForm: {
    display: "flex",
    alignItems: "center",
    padding: "10px"
  },
  paypal: {
    padding: "10px",
    backgroundColor: "#fff"
  }
}))