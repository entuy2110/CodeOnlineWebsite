import React, { useEffect, useState } from "react"
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
  TextareaAutosize,
} from "@material-ui/core"
import { FormikContextType, useFormik } from "formik"
import { createProject } from "api/api"
import { CreateProjectRequest } from "api/typesGenerated"
import { useMe_2 } from "hooks/useMe_2"
import { getFormHelpers, removeVietnameseTones } from "util/formUtils"
import { v4 as uuidv4 } from "uuid"
import { ContactSupportOutlined } from "@material-ui/icons"
import * as Yup from "yup"
import { padStart } from "lodash"

export const CreateTaskDialog = (props: any) => {
  const { onClose, open, language_id, parent_id, refetch } = props
  const [error, setError] = useState("")
  const [enableSubmissionDate, setEnableSubmissionDate] = useState(false)
  const [enableStartDate, setEnableStartDate] = useState(false)
  // const [enablePrivate, setEnablePrivate] = useState(false)
  const [submissionHour, setSubmissionHour] = React.useState(
    new Date().getHours(),
  )
  const [submissionMinute, setSubmissionMinute] = React.useState(
    new Date().getMinutes(),
  )
  const [startHour, setStartHour] = React.useState(new Date().getHours())
  const [startMinute, setStartMinute] = React.useState(new Date().getMinutes())
  const handleClose = () => {
    onClose()
  }
  const [submissionDate, setSubmissionDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const unique_id = uuidv4()
  const me_2 = useMe_2()

  useEffect(() => {
    setSubmissionHour(new Date().getHours())
    setSubmissionMinute(new Date().getMinutes())
    setStartHour(new Date().getHours())
    setStartMinute(new Date().getMinutes())
  }, [open])

  // const changePermission = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnablePrivate(event.target.checked)
  // }

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
  const validationSchema = Yup.object({
    desc: Yup.string().required("Bạn chưa điền phần này"),
  })

  const form: FormikContextType<CreateProjectRequest> =
    useFormik<CreateProjectRequest>({
      initialValues: {
        id: unique_id,
        desc: "",
        access_code: "",
        language_id: language_id,
        name: "",
        owner_id: me_2.id,
        parent_id: parent_id,
        due_date: "",
        is_exam: true,
        start_date: "",
        title: "",
      },
      validationSchema,

      onSubmit: async (values) => {
        if (!enableSubmissionDate) {
          values.due_date = ""
        } else {
          let tmp = submissionDate
          tmp.setHours(submissionHour, submissionMinute)
          setSubmissionDate(tmp)
          values.due_date = submissionDate.toISOString()
        }
        if (!enableStartDate) {
          values.start_date = ""
        } else {
          let tmp = startDate
          tmp.setHours(startHour, startMinute)
          setSubmissionDate(tmp)
          values.start_date = startDate.toISOString()
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
          await createProject(values)
          refetch()
          onClose()
        } else {
          setError("Please fill all field to the form")
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
        Tạo submission mới
      </DialogTitle>
      <Divider />
      <div style={{ display: "flex", margin: "10px 5px 15px 20px" }}>
        <form
          onSubmit={form.handleSubmit}
          style={{ width: "100%", height: "100%" }}
        >
          <TextField
            {...getFieldHelpers("desc")}
            label="Tên task"
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
          {/* <div style={{ display: "flex" }}>
            <FormControlLabel
              control={<Checkbox checked={enablePrivate} onChange={changePermission} color="primary" style={{ marginRight: "16px" }} />}
              label="Riêng tư"
              labelPlacement="end"
            />
          </div> */}
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
              label="Thời gian bắt đầu"
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
              label="Thời hạn nộp bài"
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={submissionHour}
                label="Hour"
                onChange={changeSubmissionHour}
                disabled={!enableSubmissionDate}
                variant="outlined"
              >
                {hours}
              </Select>
            </div>
            <div style={{ display: "flex", height: "40px", marginTop: "9px" }}>
              <p style={{ fontSize: "16px" }}>&nbsp;&nbsp;:&nbsp;&nbsp;</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={submissionMinute}
                label="Minute"
                onChange={changeSubmissionMinute}
                disabled={!enableSubmissionDate}
                variant="outlined"
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
            rows={6}
            placeholder="Thêm mô tả"
            fullWidth
          />

          <br></br>
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
            Tạo mới
          </Button>
        </form>
      </div>
    </Dialog>
  )
}
