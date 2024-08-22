import { Stack } from "../Stack/Stack"
import TextField from "@material-ui/core/TextField"
import { getFormHelpers, onChangeTrimmed } from "../../util/formUtils"
import { LoadingButton } from "../LoadingButton/LoadingButton"
import { FormikContextType, FormikTouched, useFormik } from "formik"
import * as Yup from "yup"
import { FC, useState } from "react"
import { BuiltInAuthFormValues } from "./SignInForm.types"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useTranslation } from "react-i18next"
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment } from "@material-ui/core"

type PasswordSignInFormProps = {
  onSubmit: (credentials: { email: string; password: string }) => void
  initialTouched?: FormikTouched<BuiltInAuthFormValues>
  isSigningIn: boolean
}

export const PasswordSignInForm: FC<PasswordSignInFormProps> = ({
  onSubmit,
  initialTouched,
  isSigningIn,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation("loginPage")
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email(t("loginForm.emailInvalid"))
      .required(t("loginForm.emailRequired")),
    password: Yup.string()
      .required(t("loginForm.passwordRequired")),
  })

  const form: FormikContextType<BuiltInAuthFormValues> =
    useFormik<BuiltInAuthFormValues>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit,
      initialTouched,
    })
  const getFieldHelpers = getFormHelpers<BuiltInAuthFormValues>(form)

  const handleChangeVisiblePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={form.handleSubmit}>
      <Stack>
        <TextField
          {...getFieldHelpers("email")}
          onChange={onChangeTrimmed(form)}
          autoFocus
          autoComplete="email"
          fullWidth
          label={t("loginForm.emailLabel")}
          type="email"
          variant="outlined"
        />
        <TextField
          {...getFieldHelpers("password")}
          autoComplete="current-password"
          fullWidth
          id="password"
          label={t("loginForm.passwordLabel")}
          type={showPassword ? "text" : "password"}
          variant="outlined"
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
        >


        </TextField>
        <div>
          <LoadingButton
            loading={isSigningIn}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
          >
            {isSigningIn ? "" : t("loginForm.passwordSignIn")}
          </LoadingButton>
        </div>
      </Stack>
    </form>
  )
}
