import { makeStyles } from "@material-ui/core/styles"
import { Sidebar } from "./Sidebar"
import { Stack } from "components/Stack/Stack"
import { FC, Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { pageTitle } from "../../util/page"
import { Margins } from "../Margins/Margins"
import { useMe } from "hooks/useMe"
import { Loader } from "components/Loader/Loader"
import { Outlet } from "react-router-dom"
import { useMe_2 } from "hooks/useMe_2"

export const SettingsLayout: FC = () => {
  const styles = useStyles()
  const me = useMe()
  const me_2 = useMe_2()

  return (
    <>
      <Helmet>
        <title>{pageTitle("Settings")}</title>
      </Helmet>

      <Margins>
        <Stack className={styles.wrapper} direction="row" spacing={6}>
          <Sidebar
            user={me}
            user_2={me_2}
          />
          <Suspense fallback={<Loader />}>
            <main className={styles.content}>
              <Outlet />
            </main>
          </Suspense>
        </Stack>
      </Margins>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(6, 0),
  },

  content: {
    maxWidth: 800,
    width: "100%",
  },
}))
