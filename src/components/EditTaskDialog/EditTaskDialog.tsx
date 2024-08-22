import React, { useEffect, useRef, useState } from "react"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
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
import { useFormik } from "formik"
import { editProject, patchGroup } from "api/api"
import { useMe_2 } from "hooks/useMe_2"
import { getFormHelpers, removeVietnameseTones } from "util/formUtils"
import * as Yup from "yup"
import { AlertBanner } from "components/AlertBanner/AlertBanner"
import AddIcon from "@material-ui/icons/AddOutlined"

export const EditTaskDialog = (props: any) => {
  const { onClose, open, project, refetch } = props

  const styles = useStyles()

  const [error, setError] = useState("")

  const [taskJSX, setTaskJSX] = useState<JSX.Element[]>([])

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

  const handleClose = () => {
    onClose()
  }

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

  const postNode = React.createElement("div", { className: "contexCon" }, <p>abcde</p>);

  const addTask = () => {
    const index = taskJSX.length

    const tmp = (
      <div key={index} style={{marginLeft: "20px", width: "400px", cursor: "pointer"}} >
        <TextField label="Name" type="text" variant="outlined" fullWidth/>
        <Typography style={{ width: "fit-content", height: "fit-content", display: "flex", alignItems: "center" }}>
          <AddIcon fontSize="small" />Thêm test case
        </Typography>

      </div>
    )
    setTaskJSX((taskJSX) => [...taskJSX, tmp])
  }

  useEffect(() => {
    if (new Date(project.due_date).getTime() > new Date().getTime()) {
      setCheckboxSubmissionDate(false)
    }
    if (new Date(project.start_date).getTime() > new Date().getTime()) {
      setCheckboxStartDate(false)
    }
  }, [project])

  const validationSchema = Yup.object({
    desc: Yup.string().required("Bạn chưa điền phần này"),
  })

  const form = useFormik({
    initialValues: {
      project_id: project.id,
      desc: project.desc,
      title: project.title,
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
        setError("Thời gian bắt đầu không thể lớn hơn thời gian kết thúc.")
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
        )
        refetch()
        onClose()
      }
    },
  })
  const getFieldHelpers = getFormHelpers(form)

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

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle id="simple-dialog-title" style={{}}>
        Sửa submission
      </DialogTitle>
      <Divider />
      <div style={{ display: "flex", margin: "10px 5px 15px 20px" }}>
        <form
          onSubmit={form.handleSubmit}
          style={{ width: "100%", height: "100%" }}
        >
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

          <TextField
            {...getFieldHelpers("desc")}
            label="Project Name"
            type="text"
            variant="outlined"
            onChange={form.handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br></br>
          <br></br>

          <div style={{ display: "flex" }}>
            <Tooltip
              title={checkboxStartDate ? "Không thể sửa thời hạn bắt đầu." : ""}
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
              label="Thời gian bắt đầu"
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
          <br></br>

          <div style={{ display: "flex" }}>
            <Tooltip
              title={
                checkboxSubmissionDate
                  ? "Không thể sửa thời hạn nộp bài do đã hết hạn nộp bài."
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
              label="Thời hạn nộp bài"
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
          <br></br>
          <TextField
            {...getFieldHelpers("title")}
            label="Mô tả"
            multiline
            rows={4}
            placeholder="Thêm mô tả"
            fullWidth
          />

          <div className={styles.add_task} onClick={addTask}>
            <AddIcon fontSize="small" />
            <Typography style={{ width: "fit-content", height: "fit-content" }}>
              Thêm bài tập mới
            </Typography>
          </div>
          <div className={styles.task_list}>{taskJSX}</div>

          <Button
            style={{ width: "40%", marginTop: "10px" }}
            onClick={handleClose}
          >
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            style={{ width: "40%", marginTop: "10px", float: "right" }}
            color="primary"
          >
            Thay đổi
          </Button>
        </form>
      </div>
    </Dialog>
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
    height: "190px",
    overflowY: "scroll"
  },
  add_testcase: {

  }
}))
