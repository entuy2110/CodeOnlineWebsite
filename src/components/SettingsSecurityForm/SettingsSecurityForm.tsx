import TextField from "@material-ui/core/TextField"
import { FormikContextType, FormikTouched, useFormik } from "formik"
import { FC } from "react"
import * as Yup from "yup"
import { getFormHelpers } from "../../util/formUtils"
import { LoadingButton } from "../LoadingButton/LoadingButton"
import { Stack } from "../Stack/Stack"
import { AlertBanner } from "components/AlertBanner/AlertBanner"
import { useTranslation } from "react-i18next"

interface SecurityFormValues {
  old_password: ""
  password: string
  confirm_password: string
}

export interface SecurityFormProps {
  isLoading: boolean
  initialValues: SecurityFormValues
  onSubmit: (values: SecurityFormValues) => void
  updateSecurityError?: Error | unknown
  // initialTouched is only used for testing the error state of the form.
  initialTouched?: FormikTouched<SecurityFormValues>
}

export const SecurityForm: FC<SecurityFormProps> = ({
  isLoading,
  onSubmit,
  initialValues,
  updateSecurityError,
  initialTouched,
}) => {
  const { t } = useTranslation("settingAccountPage")

  const validationSchema = Yup.object({
    // old_password: Yup.string().trim().required(Language.oldPasswordRequired),
    password: Yup.string()
      .trim()
      .min(8, t("security.passwordMinLength"))
      .max(64, t("security.passwordMaxLength"))
      .required(t("security.newPasswordRequired")),
    confirm_password: Yup.string()
      .trim()
      .test("passwords-match", t("security.confirmPasswordMatch"), function (value) {
        return (this.parent as SecurityFormValues).password === value
      }),
  })
  const form: FormikContextType<SecurityFormValues> =
    useFormik<SecurityFormValues>({
      initialValues,
      validationSchema,
      onSubmit,
      initialTouched,
    })
  const getFieldHelpers = getFormHelpers<SecurityFormValues>(
    form,
    updateSecurityError,
  )

  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <Stack>
          {Boolean(updateSecurityError) && (
            <AlertBanner severity="error" error={updateSecurityError} />
          )}
          {/* <TextField
            {...getFieldHelpers("old_password")}
            InputLabelProps={{
              shrink: true,
            }}
            autoComplete="old_password"
            fullWidth
            label={Language.oldPasswordLabel}
            variant="outlined"
            type="password"
          /> */}
          <TextField
            {...getFieldHelpers("password")}
            InputLabelProps={{
              shrink: true,
            }}
            autoComplete="password"
            fullWidth
            label={t("security.newPasswordLabel")}
            variant="outlined"
            type="password"
          />
          <TextField
            {...getFieldHelpers("confirm_password")}
            InputLabelProps={{
              shrink: true,
            }}
            autoComplete="confirm_password"
            fullWidth
            label={t("security.confirmPasswordLabel")}
            variant="outlined"
            type="password"
          />

          <div>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
            >
              {isLoading ? "" : t("security.updatePassword")}
            </LoadingButton>
          </div>
        </Stack>
      </form>
    </>
  )
}
