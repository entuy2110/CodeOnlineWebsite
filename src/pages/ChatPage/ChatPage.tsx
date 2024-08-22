import { FC } from "react"
import ChatPageView from "./ChatPageView"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { pageTitle } from "util/page"
import { makeStyles } from "@material-ui/core"

const Chat: FC = () => {
  const { project_name } = useParams()
  const styles = useStyles()

  return (
    <>
      <Helmet>
        <title>{pageTitle("Chat")}</title>
      </Helmet>
      <ChatPageView project_name={project_name}></ChatPageView>
    </>
  )
}

const useStyles = makeStyles({})

export default Chat
