import { FC } from "react"
import { Section } from "../../../components/SettingsLayout/Section"
import { AccountForm } from "../../../components/SettingsAccountForm/SettingsAccountForm"
import { useAuth } from "components/AuthProvider/AuthProvider"
import { useMe } from "hooks/useMe"
import { useMe_2 } from "hooks/useMe_2"
import { useTranslation } from "react-i18next"
import { User_2 } from "api/typesGenerated"

export const AccountPage: FC = () => {
  const { t } = useTranslation("settingAccountPage")
  const [authState, authSend] = useAuth()
  const me = useMe()
  const me_2 = useMe_2()
  const { updateProfileError } = authState.context


    return (
      <Section title={t("accountPage.title")} description={t("accountPage.subTitle")}>
        <AccountForm
          email={me.email}
          username={me.username}
          updateProfileError={updateProfileError}
          isLoading={authState.matches("signedIn.profile.updatingProfile")}
          fullname={me_2.fullname}
          onSubmit={(data) => {
            authSend({
              type: "UPDATE_PROFILE_V2",
              data
            })
          }}
          onUpdateUser={(data: User_2) => {
            authSend({
              type: "UPDATE_USER_V2",
              data: data
            })
          }}
        />
      </Section>
    )
}

export default AccountPage
