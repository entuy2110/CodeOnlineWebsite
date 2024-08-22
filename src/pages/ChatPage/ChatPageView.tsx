import React, { FC, useEffect, useMemo, useRef, useState } from "react"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"

import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore"
import {
  collection,
  orderBy,
  query,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  where,
} from "firebase/firestore"
import { firestore } from "../../firebase"
import Message from "components/Message/Message"
import { useMe_2 } from "hooks/useMe_2"
import { makeStyles } from "@material-ui/core"
import { PageHeader, PageHeaderTitle } from "components/PageHeader/PageHeader"
import { Stack } from "components/Stack/Stack"
import { FullScreenLoader } from "components/Loader/FullScreenLoader"
import NotFoundPage from "pages/404Page/404Page"
import { combineClasses } from "util/combineClasses"
import { createEditor, Descendant, Point, Range, Transforms } from "slate"
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps,
  useSlateStatic,
} from "slate-react"
import { withHistory } from "slate-history"
import { props } from "theme/props"

export interface ChatPageViewProps {
  project_name?: string
}

export const ChatPageView: FC<React.PropsWithChildren<ChatPageViewProps>> = ({
  project_name,
}) => {
  const dummy = useRef<null | HTMLDivElement>(null)
  const dummy2 = useRef<null | HTMLDivElement>(null)
  const me_2 = useMe_2()
  const [formValue, setFormValue] = useState<Descendant[]>([])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const inputRef = useRef<null | HTMLDivElement>(null)

  const [isDelete, setIsDelete] = useState(false)

  const [props, setProps] = useState({
    input_height: inputRef.current ? inputRef.current.offsetHeight : 36
  })
  useEffect(() => {
    if (inputRef.current) {
      setProps({
        input_height: inputRef.current.offsetHeight
      })
    }
    const timer = setTimeout(() => {
      if (dummy.current) {
        dummy.current.scrollIntoView({ behavior: "smooth" })
      }
    },5)
    return () => clearTimeout(timer);
  }, [editor.children])

  const styles = useStyles(props)

  const initialValue: Descendant[] = [
    {
      children: [{ text: "" }],
    },
  ]
  if (!project_name) {
    return <FullScreenLoader></FullScreenLoader>
  } else {
    let isJoined: boolean = false
    let displayName = ""
    me_2.joins.map((project) => {
      if (project.projects.name === project_name) {
        isJoined = true
        displayName = project.projects.desc
      }
    })
    if (!isJoined) {
      return <NotFoundPage></NotFoundPage>
    }
    const room_name = project_name
    const messagesRef = collection(firestore, room_name)
    const [messages] = useCollection(query(messagesRef, orderBy("createdAt")))

    useEffect(() => {
      if (dummy.current !== null && !isDelete) {
        dummy.current.scrollIntoView({ behavior: "smooth" })
      }
    }, [messages])

    const sendMessage = async () => {
      var htmlMsg = ""
      for (let i = 0; i < formValue.length; i++) {
        for (let j = 0; j < formValue[i].children.length; j++) {
          htmlMsg += formValue[i].children[j].text
        }
        if (i < formValue.length - 1) {
          htmlMsg += "\n"
        }
      }
      var msg_check = htmlMsg.replaceAll(" ", "")
      msg_check = msg_check.replaceAll("\n", "")

      if (msg_check !== "") {
        await addDoc(collection(firestore, room_name), {
          username: me_2.username,
          icon: "",
          text: htmlMsg,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          user_id: me_2.id,
          fullName: me_2.fullname,
        })
      }
      // setFormValue(initialValue)
    }

    const deleteMessage = async (id: string) => {
      setIsDelete(true)
      await deleteDoc(doc(firestore, room_name, id))
      setIsDelete(false)
    }
    return (
      <>
        <main>
          <PageHeader className={styles.header}>
            <PageHeaderTitle>
              <Stack direction="row" spacing={1} alignItems="center">
                <span style={{ marginLeft: "30px", position: "fixed" }}>
                  {" "}
                  {displayName}
                </span>
              </Stack>
            </PageHeaderTitle>
          </PageHeader>
          <div className={styles.message_div} ref={dummy2}>
            {messages &&
              messages.docs.map((msg, index) => (
                <Message
                  key={index}
                  id={msg.id}
                  createdAt={msg.data().createdAt}
                  username={msg.data().username}
                  text={msg.data().text}
                  user_id={msg.data().user_id}
                  icon={msg.data().icon}
                  fullName={msg?.data().fullName}
                  deleteMessage={deleteMessage}
                />
              ))}
            <span ref={dummy}></span>
          </div>
        </main>
        <div className={styles.form_div}>
          <div className={styles.input_div} ref={inputRef}>
            <Slate
              editor={editor}
              initialValue={initialValue}
              onChange={(value) => {
                setFormValue(value)
              }}
            >
              <Editable
                placeholder={`Nhắn #${displayName}`}
                style={{ outline: "none" }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    sendMessage()

                    const lastChild =
                      editor.children[editor.children.length - 1].children

                    const point1: Point = {
                      path: [0, 0],
                      offset: 0,
                    }
                    const point2: Point = {
                      path: [editor.children.length - 1, lastChild.length - 1],
                      offset: lastChild[lastChild.length - 1].text.length,
                    }

                    const range: Range = {
                      anchor: point1,
                      focus: point2,
                    }

                    editor.delete({ at: range })
                  }
                }}
              />
            </Slate>
          </div>
          {/* <button
              className={
                formValue.trim()
                  ? combineClasses([styles.button])
                  : combineClasses([styles.button, styles.button_disabled])
              }
              type="submit"
              disabled={!formValue}
            >
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
              </svg>
            </button> */}
        </div>
      </>
    )
  }
}

const useStyles = makeStyles({
  header: {
    backgroundColor: "hsl(223, 44%, 9%)",
    borderBottom: "1px solid hsl(222, 31%, 25%)",
    height: "10px",
    paddingTop: "36px",
    paddingBottom: "36px",
  },
  message_div: (props) => ({
    height: `calc(100% - 106px - ${props.input_height}*1px)`,
    overflowY: "scroll",
    position: "fixed",
    width: "100%",
    padding: "0 5px",
    overflowX: "hidden",
    paddingBottom: "12px",
  }),
  form_div: (props) => ({
    height: `calc(34px + ${props.input_height}*1px)`,
    minHeight: "70px",
    position: "fixed",
    bottom: "0px",
    width: "100%",
    borderTop: "1px solid #4b4b4b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  form: {
    display: "flex",
    width: "94%",
    gap: "10px",
  },
  form_button: {},
  input_div: {
    width: "97%",
    minHeight: "36px",
    maxHeight: "116px",
    background: "#353535",
    borderRadius: "20px",
    border: "0",
    outline: "none",
    fontSize: "14px",
    paddingRight: "16px",
    paddingLeft: "16px",
    paddingTop: "8px",
    paddingBottom: "8px",
    position: "fixed",
    bottom: "16px",
    // left: "20px",
    overflowY: "auto",
    scrollbarWidth: "none",
    // fontFamily: "Arial"
  },
  input: {
    display: "inline-block",
    // width: "100%",
    minWidth: "100%",
    height: "100%",
    border: "0",
    outline: "none",
    fontSize: "14px",
    background: "#353535",
    fontFamily: "Arial",
    resize: "none",
  },
  button: {
    height: "40px",
    width: "45px",
    backgroundColor: "#0b93f6",
    color: "#0253ff",
    textTransform: "uppercase",
    borderStyle: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    outline: "none",
  },
  button_disabled: {
    opacity: "0.5",
  },
  main: {
    padding: "10px",
    height: "80vh",
    margin: "10vh 0 10vh",
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    fill: "#fff",
  },
})

export default ChatPageView
