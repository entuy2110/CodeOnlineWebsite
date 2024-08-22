import { useMachine } from "@xstate/react"
import { useMe } from "hooks/useMe"
import { FC } from "react"
import { userSecuritySettingsMachine } from "xServices/userSecuritySettings/userSecuritySettingsXService"
import { Section } from "../../../components/SettingsLayout/Section"
import { SecurityForm } from "../../../components/SettingsSecurityForm/SettingsSecurityForm"
import { useTranslation } from "react-i18next"

export const SecurityPage: FC = () => {
  const { t } = useTranslation("settingAccountPage")
  const me = useMe()
  const [securityState, securitySend] = useMachine(
    userSecuritySettingsMachine,
    {
      context: {
        userId: me.id,
      },
    },
  )
  const { error } = securityState.context

  return (
    <Section title={t("security.title")} description={t("security.subTitle")}>
      <SecurityForm
        updateSecurityError={error}
        isLoading={securityState.matches("updatingSecurity")}
        initialValues={{ old_password: "", password: "", confirm_password: "" }}
        onSubmit={(data) => {
          securitySend({
            type: "UPDATE_SECURITY",
            data,
          })
        }}
      />
    </Section>
  )
}

export default SecurityPage
