import { TextField, makeStyles } from "@material-ui/core"
import { CoderIcon } from "components/Icons/CoderIcon"
import { LoadingButton } from "components/LoadingButton/LoadingButton"
import { Stack } from "components/Stack/Stack"
import { useFormik } from "formik"
import { FC } from "react"
import { getFormHelpers, onChangeTrimmed } from "util/formUtils"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"

export interface ForgotPasswordPageViewProps {
  sendResetPassword: (email: string) => void
}

export const ForgotPasswordPageView: FC<ForgotPasswordPageViewProps> = ({
  sendResetPassword,
}) => {
  const { t } = useTranslation("forgotPasswordPage")
  const styles = useStyles()

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email(t("forgotPasswordForm.emailInvalid"))
      .required(t("forgotPasswordForm.emailRequired")),
  })

  const form = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: () => {
      sendResetPassword(form.values.email)
    },
    validationSchema
  })
  const getFieldHelpers = getFormHelpers(form)

  return (
  <div className={styles.root1}>
    <div className={styles.container}>
      <CoderIcon fill="white" opacity={1} className={styles.icon} />
      <div className={styles.root2}>
        <h1 className={styles.title}>
          {t('title')}
        </h1>
        <form onSubmit={form.handleSubmit}>
          <Stack>
            <TextField
              {...getFieldHelpers("email")}
              onChange={onChangeTrimmed(form)}
              fullWidth
              label={t("email")}
              type="email"
              variant="outlined"
              autoComplete="off"
            />
            <div>
              <LoadingButton
                loading={false}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
              {/* {isSigningIn ? "" : Language.passwordSignIn} */} {t("button")}
              </LoadingButton>
            </div>
          </Stack>  
        </form>
      </div>
    </div>
  </div>
  )    
}

const useStyles = makeStyles((theme) => ({
  root1: {
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
  },
  root2: {
    width: "100%",
  },
  title: {
    fontSize: theme.spacing(4),
    fontWeight: 400,
    margin: 0,
    marginBottom: theme.spacing(4),
    lineHeight: 1,

    "& strong": {
      fontWeight: 600,
    },
  },
  icon: {
    fontSize: theme.spacing(5),
  },

  container: {
    width: "100%",
    maxWidth: 385,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
  },

  // icon: {
  //   fontSize: theme.spacing(8),
  // },

  footer: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(3),
  },
}))
  
export default ForgotPasswordPageView