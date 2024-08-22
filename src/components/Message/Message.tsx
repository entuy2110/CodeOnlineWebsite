import { makeStyles } from "@material-ui/core"
import { UserAvatar } from "components/UserAvatar/UserAvatar"
import { format, fromUnixTime } from "date-fns"
import { useMe_2 } from "hooks/useMe_2"
import { FC } from "react"
import { combineClasses } from "util/combineClasses"
// import purify from "dompurify";
import Parser from "html-react-parser"
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined"

export interface MessageProps {
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  id: string
  username: string
  icon: string
  text: string
  user_id: string
  fullName: string
  deleteMessage: (id: string) => void
}

const Message: FC<React.PropsWithChildren<MessageProps>> = ({
  id,
  createdAt,
  username,
  icon,
  text,
  user_id,
  fullName,
  deleteMessage,
}) => {
  const me_2 = useMe_2()
  const styles = useStyles()
  const messageClass = user_id === me_2.id ? "sent" : "received"
  const isOwnMsg = user_id === me_2?.id
  let date
  let formattedTime = ""

  if (createdAt) {
    date = fromUnixTime(createdAt?.seconds)
    formattedTime = format(date, "HH:mm")
  }

  return (
    <>
      <div
        className={combineClasses([
          styles.message,
          messageClass === "sent" ? styles.sent : "",
        ])}
      >
        <UserAvatar username={username} avatarURL={icon} />
        &nbsp;
        <div className={styles.msgBox}>
          {isOwnMsg && (
            <DeleteOutlineOutlinedIcon
              onClick={() => {
                deleteMessage(id)
              }}
              className={styles.deleteIcon}
            />
          )}

          {isOwnMsg ? null : (
            <span className={styles.username}>{fullName}</span>
          )}
          <div
            className={combineClasses([
              styles.message_text,
              messageClass === "sent" ? styles.p : styles.received_p,
            ])}
          >
            <div className={styles.textContent}>
              {/* {text.replace(/ /g, "\u00A0")} */}
              {text}
            </div>
            <div className={styles.timeContent}>{formattedTime}</div>
          </div>
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles(() => ({
  message_text: {
    color: "white",
    // border: "2px solid rgb(56 115 226)",
    background: "#2b5fff",
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "flex-end",
    padding: "8px 10px",
    borderRadius: "18px",
    whiteSpace: "pre-line",
    overflowWrap: "break-word",
  },
  message: {
    display: "flex",
    alignItems: "end",
    gap: "2px",
    marginTop: "12px",
  },
  sent: {
    flexDirection: "row-reverse",
    "& $msgBox": {
      display: "flex",
    },
  },
  received_p: {
    maxWidth: "500px",
    // border: "2px solid white",
    background: "#353535",
  },
  p: {
    maxWidth: "500px",
    /* margin-bottom: 12px;
    line-height: 24px; */
    position: "relative",
    color: "white",
  },
  msgBox: {
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: "10px",
    color: "#ccc",
    marginLeft: "4px",
  },
  textContent: {
    wordWrap: "break-word",
    width: "94%",
    whiteSpace: "pre-wrap",
  },
  timeContent: {
    fontSize: 9,
    color: "#ccc",
    lineHeight: "12px",
    paddingLeft: 5,
  },
  deleteIcon: {
    color: "#505050",
    "&:hover": {
      color: "#d9d9d9",
    },
    transform: "scale(0.8)",
  },
}))

export default Message
