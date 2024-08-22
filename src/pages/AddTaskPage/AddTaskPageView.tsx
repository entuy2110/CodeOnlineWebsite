import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { createProject, createTask, editProject, getLanguagebyId } from "api/api"
import { CreateProjectRequest, Exercise, Project } from "api/typesGenerated"
import { AlertBanner } from "components/AlertBanner/AlertBanner"
import {
  FormFooter,
  FormSection_2,
  HorizontalForm_2,
} from "components/Form/Form"
import { FullPageHorizontalForm } from "components/FullPageForm/FullPageHorizontalForm"
import { FormikContextType, useFormik } from "formik"
import React, { FC, createContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getFormHelpers, removeVietnameseTones } from "util/formUtils"
import * as Yup from "yup"
import AddIcon from "@material-ui/icons/AddOutlined"
import { Collapse } from "@material-ui/core"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark"
import { Task } from "components/AddTask/Task"
import { v4 as uuidv4 } from "uuid"
import { useMe_2 } from "hooks/useMe_2"
import { combineClasses } from "util/combineClasses"
import { useTranslation } from "react-i18next"

export interface AddTaskPageViewProps {
  parent_project: Project
  projectPageLink: string
}

type UserContextType = {
  taskList: Exercise[],
  setTaskList: React.Dispatch<React.SetStateAction<Exercise[]>>
  dummy: boolean 
  setDummy: React.Dispatch<React.SetStateAction<boolean>>
}

const iUserContextState = {
  taskList: [],
  setTaskList: () => {},
  dummy: false,
  setDummy: () => {}
}

export const TaskListContext = createContext<UserContextType>(iUserContextState);

export const AddTaskPageView: FC<
  React.PropsWithChildren<AddTaskPageViewProps>
> = ({ parent_project, projectPageLink }) => { 
  const { t } = useTranslation("addTaskPage")
  const navigate = useNavigate()
  const styles = useStyles()
  const me_2 = useMe_2()
  const unique_id = uuidv4()

  const [languageName, setLanguageName] = useState("")

  const [taskList, setTaskList] = useState<Exercise[]>([])
  const [dummy, setDummy] = useState(false)

  const scrollToDivider = useRef<HTMLDivElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const [error, setError] = useState("")

  const [enableAutograde, setEnableAutograde] = useState(false)

  const [enableStartDate, setEnableStartDate] = useState(false)
  const [startHour, setStartHour] = useState(new Date().getHours())
  const [startMinute, setStartMinute] = useState(new Date().getMinutes())
  const [startDate, setStartDate] = useState(new Date())

  const [enableSubmissionDate, setEnableSubmissionDate] = useState(false)
  const [submissionHour, setSubmissionHour] = useState(new Date().getHours())
  const [submissionMinute, setSubmissionMinute] = useState(
    new Date().getMinutes(),
  )
  const [submissionDate, setSubmissionDate] = useState(new Date())

  const [taskJSX, setTaskJSX] = useState<JSX.Element[]>([])

  const changeEnableStartDate = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnableStartDate(event.target.checked)
  }

  const changeStartDate = (event: any) => {
    setStartDate(new Date(event.target.value))
  }
  const changeStartHour = (event: any) => {
    setStartHour(event.target.value)
  }
  const changeStartMinute = (event: any) => {
    setStartMinute(event.target.value)
  }

  const changeEnableSubmissionDate = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnableSubmissionDate(event.target.checked)
  }

  const changeSubmissionDate = (event: any) => {
    setSubmissionDate(new Date(event.target.value))
  }
  const changeSubmissionHour = (event: any) => {
    setSubmissionHour(event.target.value)
  }
  const changeSubmissionMinute = (event: any) => {
    setSubmissionMinute(event.target.value)
  }

  const changeEnableAutograde = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnableAutograde(event.target.checked)
  }

  const handleAlertScroll = () => {
    window.scrollTo({ behavior: "smooth", top: 0})
  }

  const handleScroll = () => {
    if (divRef.current) {
      divRef.current.style.height = "600px"
    }
    if (scrollToDivider.current) {
      scrollToDivider.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const addTask = () => {
    handleScroll()
    var taskList_tmp = taskList
    var id
    if (taskList_tmp.length === 0) {
      id = 0
      taskList_tmp[0] = {
        task_id: 0,
        desc: "",
        cases: []
      }
    } else {
      id = taskList_tmp[taskList_tmp.length - 1].task_id + 1
      taskList_tmp[taskList_tmp.length] = {
        task_id: taskList_tmp[taskList_tmp.length - 1].task_id + 1, 
        desc: "",
        cases: []
      }
    }

    const index = taskJSX.length

    const tmp = (
      <Task
        key={index}
        id={id}
      />
    )
    setTaskJSX((taskJSX) => [...taskJSX, tmp])
  }

  const hours = []
  for (let i = 0; i < 24; i++) {
    hours.push(
      <MenuItem key={i} value={i}>
        {i.toString().padStart(2, "0")}
      </MenuItem>,
    )
  }
  const minutes = []
  for (let i = 0; i < 60; i++) {
    minutes.push(
      <MenuItem key={i} value={i}>
        {i.toString().padStart(2, "0")}
      </MenuItem>,
    )
  }

  const validationSchema = Yup.object({
    desc: Yup.string().required(t("formRequire")),
  })

  const form: FormikContextType<CreateProjectRequest> =
    useFormik<CreateProjectRequest>({
      initialValues: {
        id: unique_id,
        desc: "",
        access_code: "",
        language_id: parent_project.language_id,
        name: "",
        owner_id: me_2.id,
        parent_id: parent_project.id,
        due_date: "",
        is_exam: true,
        start_date: "",
        title: "",
        autograde: false,
        testcase: JSON.stringify(taskList),
        doc_link: "",
      },
      validationSchema,

      onSubmit: async (values) => {
        const start_time = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startHour,
          startMinute,
        )
        const submission_time = new Date(
          submissionDate.getFullYear(),
          submissionDate.getMonth(),
          submissionDate.getDate(),
          submissionHour,
          submissionMinute,
        )

        var due_date = ""
        var start_date = ""
        if (start_time.getTime() > submission_time.getTime()) {
          setError(t("timeError"))
          handleAlertScroll()
        } else {
          setError("")
          if (enableSubmissionDate) {
            // setSubmissionDate(submission_date)
            due_date = submission_time.toISOString()
            form.values.due_date = due_date
          } else {
            due_date = ""
            form.values.due_date = due_date
          }
          if (!enableStartDate) {
            start_date = ""
            form.values.start_date = start_date
          } else {
            // setSubmissionDate(start_date)
            start_date = start_time.toISOString()
            form.values.start_date = start_date
          }
          // values.is_exam = enablePrivate
          form.values.id = unique_id
          if (values.desc) {
            const random = String(Math.floor(Math.random() * 899998) + 100001)
            const words = values.desc.match(/\b(\w+)\b/g)
            var nameNormalize = ""
            if (words) {
              for (let i = 0; i < words.length; i++) {
                if (i === words.length - 1) {
                  nameNormalize += words[i]
                } else {
                  nameNormalize += words[i] + "_"
                }
              }
            }
            nameNormalize = removeVietnameseTones(nameNormalize)
            nameNormalize = nameNormalize.toLowerCase() + "_" + random
            form.values.name = nameNormalize

            form.values.autograde = enableAutograde
            form.values.testcase = JSON.stringify(taskList)
            await createProject(values)
            createTask(values.id, taskList)
            navigate(projectPageLink)
          } else {
            setError("Please fill all field to the form")
            handleAlertScroll()
          }
        }
      },
    })

  const getFieldHelpers = getFormHelpers(form)

  useEffect(() => {
    const getLanguage = async () => {
      const data = await getLanguagebyId(parent_project.language_id) 
      setLanguageName(data.name)
    }
    getLanguage()
  }, [])

  return (
    <FullPageHorizontalForm title={t("title")} detail={t("detail")}>
      <HorizontalForm_2 onSubmit={form.handleSubmit}>
      {error !== "" && (
        <AlertBanner
          error={error}
          text={error}
          severity="error"
          dismissible={true}
          onDismiss={() => {
            setError("")
          }}
        />
      )}
        <FormSection_2 title={t("submissionName")} description={""}>
          <TextField
            {...getFieldHelpers("desc")}
            label={t("submissionName")}
            type="text"
            variant="outlined"
            onChange={form.handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormSection_2>

        <FormSection_2 title={t("startSubmission")} description={""}>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableStartDate}
                  onChange={changeEnableStartDate}
                  name="checkStart"
                  color="primary"
                />
              }
              label=""
            />
            <TextField
              label={t("startSubmission")}
              type="date"
              variant="outlined"
              onChange={changeStartDate}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!enableStartDate}
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
            <div
              style={{
                display: "flex",
                height: "40px",
                marginTop: "9px",
                marginLeft: "10px",
              }}
            >
              <Select
                labelId="startHour"
                id="startHourSelect"
                value={startHour}
                label="Hour"
                onChange={changeStartHour}
                disabled={!enableStartDate}
                variant="outlined"
              >
                {hours}
              </Select>
            </div>
            <div style={{ display: "flex", height: "40px", marginTop: "9px" }}>
              <p style={{ fontSize: "16px" }}>&nbsp;&nbsp;:&nbsp;&nbsp;</p>
              <Select
                labelId="startMinute"
                id="startMinuteSelect"
                value={startMinute}
                label="Minute"
                onChange={changeStartMinute}
                disabled={!enableStartDate}
                variant="outlined"
              >
                {minutes}
              </Select>
            </div>
          </div>
        </FormSection_2>
        <FormSection_2 title={t("endSubmission")} description={""}>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableSubmissionDate}
                  onChange={changeEnableSubmissionDate}
                  name="checkSubmission"
                  color="primary"
                />
              }
              label=""
            />
            <TextField
              label={t("endSubmission")}
              type="date"
              variant="outlined"
              onChange={changeSubmissionDate}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!enableSubmissionDate}
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
            <div
              style={{
                display: "flex",
                height: "40px",
                marginTop: "9px",
                marginLeft: "10px",
              }}
            >
              <Select
                labelId="submissionHour"
                id="submissionHourSelect"
                value={submissionHour}
                label="Hour"
                onChange={changeSubmissionHour}
                variant="outlined"
                disabled={!enableSubmissionDate}
              >
                {hours}
              </Select>
            </div>
            <div style={{ display: "flex", height: "40px", marginTop: "9px" }}>
              <p style={{ fontSize: "16px" }}>&nbsp;&nbsp;:&nbsp;&nbsp;</p>
              <Select
                labelId="submissionMinute"
                id="submissionMinuteSelect"
                value={submissionMinute}
                label="Minute"
                onChange={changeSubmissionMinute}
                variant="outlined"
                disabled={!enableSubmissionDate}
              >
                {minutes}
              </Select>
            </div>
          </div>
        </FormSection_2>

        <FormSection_2 title={t("desc")} description={""}>
          <TextField
            {...getFieldHelpers("title")}
            label={t("desc")}
            multiline
            rows={4}
            placeholder={t("descPlaceholder")}
            fullWidth
          />
        </FormSection_2>

        {(languageName === "C" || languageName === "C++" || languageName === "Java" || languageName === "Python") && (
          <FormSection_2 title={t("testcase")} description={""}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableAutograde}
                  onChange={changeEnableAutograde}
                  name="checkSubmission"
                  color="primary"
                />
              }
              label=""
            />
          </FormSection_2>
        )}

        {enableAutograde && (
          <>
            <div ref={scrollToDivider}>
              <Divider></Divider>
            </div>
            <div ref={divRef} style={{ overflowY: "auto" }}>
              <div className={styles.add_task} onClick={addTask}>
                <AddIcon fontSize="small" />
                <Typography
                  style={{ width: "fit-content", height: "fit-content" }}
                >
                  {t("addTaskForm.addTask")}
                </Typography>
              </div>
              <br />
              <div className={styles.task_list}>
                <TaskListContext.Provider value={{taskList, setTaskList, dummy, setDummy}}>
                  {taskJSX}
                </TaskListContext.Provider>
              </div>
            </div>
          </>
        )}

        <FormFooter
          onCancel={() => {
            // Go back
            navigate(-1)
          }}
          isLoading={false}
          submitLabel={t("confirm")}
        />
      </HorizontalForm_2>
    </FullPageHorizontalForm>
  )
}

const useStyles = makeStyles((theme) => ({
  add_task: {
    display: "flex",
    width: "fit-content",
    height: "fit-content",
    cursor: "pointer",
  },
  task_list: {
    display: "flex",
    flexDirection: "column",
    // height: "190px",
    // overflowY: "scroll"
  },
  add_testcase: {},
}))
