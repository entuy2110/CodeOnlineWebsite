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
import { createTask, editProject, getLanguagebyId } from "api/api"
import { Exercise, Project } from "api/typesGenerated"
import { AlertBanner } from "components/AlertBanner/AlertBanner"
import {
  FormFooter,
  FormSection_2,
  HorizontalForm_2,
} from "components/Form/Form"
import { FullPageHorizontalForm } from "components/FullPageForm/FullPageHorizontalForm"
import { useFormik } from "formik"
import React, { FC, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getFormHelpers } from "util/formUtils"
import * as Yup from "yup"
import AddIcon from "@material-ui/icons/AddOutlined"
import { Collapse } from "@material-ui/core"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import { Task } from "components/AddTask/Task"
import { ContactSupportOutlined } from "@material-ui/icons"
import { useTranslation } from "react-i18next"
import { TaskListContext } from "pages/AddTaskPage/AddTaskPageView"

export interface EditTaskPageViewProps {
  project: Project
  projectPageLink: string
}

export const EditTaskPageView: FC<
  React.PropsWithChildren<EditTaskPageViewProps>
> = ({ 
  project, 
  projectPageLink 
}) => {
  const navigate = useNavigate()
  const styles = useStyles()
  const { t } = useTranslation("editTaskPage")

  const [languageName, setLanguageName] = useState("")

  const [enableAutograde, setEnableAutograde] = useState(project.autograde)

  
  const [taskList, setTaskList] = useState<Exercise[]>(
    project.testcase === "null" || project.testcase === "[]" ? 
    []
    :
    JSON.parse(project.testcase)
  )
  const [dummy, setDummy] = useState(false)

  var initTaskJSX: JSX.Element[] = []
  if (taskList) {
    taskList.map((task, index) => {
      initTaskJSX = [
        ...initTaskJSX,
        <Task
          key={index}
          id={task.task_id}
        />,
      ]
    })
  }

  const scrollToDivider = useRef<HTMLDivElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const [error, setError] = useState("")

  const [enableStartDate, setEnableStartDate] = useState(
    project.start_date &&
      new Date(project.start_date).getTime() > new Date().getTime()
      ? true
      : false,
  )
  const [checkboxStartDate, setCheckboxStartDate] = useState(true)
  const [startHour, setStartHour] = useState(
    project.start_date ? new Date(project.start_date).getHours() : 0,
  )
  const [startMinute, setStartMinute] = useState(
    project.start_date ? new Date(project.start_date).getMinutes() : 0,
  )
  const [startDate, setStartDate] = useState(
    project.start_date ? new Date(project.start_date) : new Date(),
  )

  const [enableSubmissionDate, setEnableSubmissionDate] = useState(
    project.due_date &&
      new Date(project.due_date).getTime() > new Date().getTime()
      ? true
      : false,
  )
  const [checkboxSubmissionDate, setCheckboxSubmissionDate] = useState(true)
  const [submissionHour, setSubmissionHour] = useState(
    project.due_date ? new Date(project.due_date).getHours() : 0,
  )
  const [submissionMinute, setSubmissionMinute] = useState(
    project.due_date ? new Date(project.due_date).getMinutes() : 0,
  )
  const [submissionDate, setSubmissionDate] = useState(
    project.due_date ? new Date(project.due_date) : new Date(),
  )

  const [taskJSX, setTaskJSX] = useState<JSX.Element[]>(initTaskJSX)

  useEffect(() => {
    if (new Date(project.due_date).getTime() > new Date().getTime() || !project.due_date) {
      setCheckboxSubmissionDate(false)
    }
    if (new Date(project.start_date).getTime() > new Date().getTime() || !project.start_date) {
      setCheckboxStartDate(false)
    }
  }, [project])

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

  const form = useFormik({
    initialValues: {
      project_id: project.id,
      desc: project.desc,
      title: project.title,
      doc_link: project.doc_link ? project.doc_link : ""
    },
    validationSchema,

    onSubmit: (values) => {
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
        } else {
          due_date = ""
        }
        if (!enableStartDate) {
          start_date = ""
        } else {
          // setSubmissionDate(start_date)
          start_date = start_time.toISOString()
        }

        editProject(
          values.project_id,
          values.desc,
          start_date,
          due_date,
          values.title,
          enableAutograde,
          JSON.stringify(taskList),
          values.doc_link
        )
        createTask(values.project_id, taskList)
        navigate(projectPageLink)
      }
    },
  })

  const getFieldHelpers = getFormHelpers(form)

  useEffect(() => {
    const getLanguage = async () => {
      const data = await getLanguagebyId(project.language_id) 
      setLanguageName(data.name)
    }
    getLanguage()
  }, [])

  return (
    <FullPageHorizontalForm
      title={t("title")}
      detail={t("detail")}
    >
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
            <Tooltip
              title={checkboxStartDate ? t("noStartSubmission") : ""}
              placement="top"
            >
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
                disabled={checkboxStartDate}
              />
            </Tooltip>
            <TextField
              label={t("startSubmission")}
              type="date"
              variant="outlined"
              onChange={changeStartDate}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!enableStartDate}
              defaultValue={
                project.start_date
                  ? new Date(project.start_date).toISOString().slice(0, 10)
                  : new Date().toISOString().slice(0, 10)
              }
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
            <Tooltip
              title={
                checkboxSubmissionDate
                  ? t("noEndSubmission")
                  : ""
              }
              placement="top"
            >
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
                disabled={checkboxSubmissionDate}
              />
            </Tooltip>

            <TextField
              label={t("endSubmission")}
              type="date"
              variant="outlined"
              onChange={changeSubmissionDate}
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={
                project.due_date
                  ? new Date(project.due_date).toISOString().slice(0, 10)
                  : new Date().toISOString().slice(0, 10)
              }
              disabled={!enableSubmissionDate}
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
            <div>
              <div className={styles.add_task} onClick={addTask}>
                <AddIcon fontSize="small" />
                <Typography
                  style={{ width: "fit-content", height: "fit-content" }}
                >
                  {t("addTaskForm.addTask")}
                </Typography>
              </div>
              <br />

              <div ref={divRef} className={styles.task_list}>
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
    // overflowY: "auto",
    // height: "190px",
    // overflowY: "scroll"
  },
  add_testcase: {},
}))
