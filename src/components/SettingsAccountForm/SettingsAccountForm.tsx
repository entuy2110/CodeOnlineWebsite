import TextField from "@material-ui/core/TextField"
import { FormikContextType, FormikTouched, useFormik } from "formik"
import { FC, useState } from "react"
import { LoadingButton } from "../LoadingButton/LoadingButton"
import { Stack } from "../Stack/Stack"
import { AlertBanner } from "components/AlertBanner/AlertBanner"
import { useTranslation } from "react-i18next"
import WarningIcon from '@material-ui/icons/Warning';
import { VerifyEmailDialog } from "components/VerifyEmailDialog/VerifyEmailDialog"
import { Link, Typography, makeStyles } from "@material-ui/core"
import { sendVerifyEmail } from "api/api"
import { useMe_2 } from "hooks/useMe_2"
import { User_2 } from "api/typesGenerated"
import * as Yup from "yup"
import { getFormHelpers } from "util/formUtils"

export interface AccountFormValues {
  fullname: string
}

export interface AccountFormProps {
  // editable: boolean
  email: string
  username: string
  isLoading: boolean
  onSubmit: (values: AccountFormValues) => void
  updateProfileError?: Error | unknown
  // initialTouched is only used for testing the error state of the form.
  initialTouched?: FormikTouched<AccountFormValues>
  fullname: string
  onUpdateUser: (data: User_2) => void
}

export const AccountForm: FC<React.PropsWithChildren<AccountFormProps>> = ({
  email,
  username,
  isLoading,
  onSubmit,
  updateProfileError,
  initialTouched,
  fullname,
  onUpdateUser
}) => {
  const { t } = useTranslation("common")
  const [open, setOpen] = useState(false);
  const [canSendVerify, setCanSendVerify] = useState(true)
  const styles = useStyles()
  const me_2 = useMe_2()
  const validationSchema = Yup.object({
    fullname: Yup.string()
    .required("Bạn chưa nhập tên!"),
  })

  const form: FormikContextType<AccountFormValues> =
    useFormik<AccountFormValues>({
      initialValues: {
        fullname: fullname
      },
      validationSchema,
      onSubmit,
      initialTouched,
    })

  const getFieldHelpers = getFormHelpers(form)

  const startCount = () => {
    setTimeout(() => {
      setCanSendVerify(true)
    },300000)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <Stack>
          {Boolean(updateProfileError) && (
            <AlertBanner severity="error" error={updateProfileError} />
          )}
          <TextField
            disabled
            fullWidth
            label={t("userForm.email")}
            value={email}
            variant="outlined"
          />

          {!me_2.email_verified &&
            <div style={{ display: "flex" }}>
              <WarningIcon
                color="error"
                fontSize="small"
              />
              &nbsp;&nbsp;&nbsp;
              <Typography>
              Email của bạn chưa được xác thực.&nbsp;
                <Link
                  underline="none"
                  href=""
                  onClick={(event) => {
                    event.preventDefault()
                    if (canSendVerify) {
                      sendVerifyEmail().then((res) => {
                        if (res === 1) {
                          setCanSendVerify(false)
                          startCount()
                        }
                      })
                    }
                    handleClickOpen()
                  }}
                >
                  Xác thực email
                </Link>
              </Typography>
            </div>
          }

          <VerifyEmailDialog
            open={open}
            onClose={handleClose}
            onUpdateUser={onUpdateUser}
          />
          <TextField
            disabled
            fullWidth
            label={t("userForm.username")}
            variant="outlined"
            value={username}
          />
          <TextField
            {...getFieldHelpers("fullname")}
            onChange={form.handleChange}
            fullWidth
            label={t("userForm.fullname")}  
            variant="outlined"
            value={form.values.fullname}
          />

          <div>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
            >
              {isLoading ? "" : t("userForm.updateSetting")}
            </LoadingButton>
          </div>
        </Stack>
      </form>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex"
  }
}))
