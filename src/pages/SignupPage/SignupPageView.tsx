import { InputAdornment, TextField, makeStyles } from "@material-ui/core"
import { CoderIcon } from "components/Icons/CoderIcon"
import { LoadingButton } from "components/LoadingButton/LoadingButton"
import { Stack } from "components/Stack/Stack"
import { useFormik } from "formik"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { getFormHelpers, onChangeTrimmed } from "util/formUtils"
import * as Yup from "yup"
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';


export interface SignupPageViewProps {
  isSigningUp: boolean
  signUp: (email: string, password: string, fullname: string) => void
}

export const SignupPageView: FC<SignupPageViewProps> = ({
  isSigningUp,
  signUp,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation("signUpPage")
  const styles = useStyles()

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email(t("signUpform.emailInvalid"))
      .required(t("signUpform.emailRequired")),
    password: Yup.string()
    .required(t("signUpform.emailRequired")),
    fullname: Yup.string()
    .required("Bạn chưa nhập tên!"),
  })

  const form= useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
    },
    onSubmit: () => {
      const formValues = form.values
      signUp(formValues.email, formValues.password, formValues.fullname)
    },
    validationSchema
  })
  const getFieldHelpers = getFormHelpers(form)

  const handleChangeVisiblePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
  <div className={styles.root1}>
    <div className={styles.container}>
      <CoderIcon fill="white" opacity={1} className={styles.icon} />
      <div className={styles.root2}>
        <h1 className={styles.title}>
          {t("signUpTo")}&nbsp;
          <strong>CodeOnline</strong>
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
              autoComplete="one-time-code"
            />
            <TextField
              {...getFieldHelpers("password")}
              fullWidth
              label={t("password")}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              autoComplete="one-time-code"
              onChange={onChangeTrimmed(form)}
              InputProps={{endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? 
                  <div style={{cursor: "pointer"}} onClick={handleChangeVisiblePassword}><VisibilityIcon fontSize="small"></VisibilityIcon></div> 
                  : 
                  <div style={{cursor: "pointer"}} onClick={handleChangeVisiblePassword}><VisibilityOffIcon fontSize="small"></VisibilityOffIcon></div>
                  }
                </InputAdornment>
                ),
              }}
            />
            <TextField
              {...getFieldHelpers("fullname")}
              fullWidth
              label={t("fullname")}
              type="text"
              variant="outlined"
              autoComplete="off"
            />
            <div>
              <LoadingButton
                loading={isSigningUp}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
              {t("button")}
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
  
export default SignupPageView