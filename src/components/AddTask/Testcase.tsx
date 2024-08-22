import { Button, TextField } from "@material-ui/core"
import { Testcase } from "api/typesGenerated"
import { ChangeEvent, FC, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { TaskContext } from "./Task"

export interface TestcaseProps {
  id: number
}

export const TestcaseInput: FC<TestcaseProps> = ({
  id,
}) => {
  const {task, setTask, dumb, setDumb} = useContext(TaskContext)
  const { t } = useTranslation("editTaskPage")
  var index = -2
  var testcase: Testcase = {
    testcase_id: 0,
    input: "",
    output: ""
  }

  task.cases.map((value, i) => {
    if (value.testcase_id === id) {
      index = i
      testcase = value
    }
  })  
  const [deletedTestcase, setDeletedTestcase] = useState(false)

  const updateInputTestcase = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (!deletedTestcase) {
      var task_tmp = task
      task_tmp.cases[index].input = event.target.value
      setTask(task_tmp)
      setDumb(!dumb)
    }
  }

  const updateOutputTestcase = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (!deletedTestcase) {
      var task_tmp = task
      task_tmp.cases[index].output = event.target.value
      setTask(task_tmp)
      setDumb(!dumb)
    }
  }

  const handleDeleteTestcase = (index: number) => {
    setDeletedTestcase(true)
    var task_tmp = task
    task_tmp.cases = task_tmp.cases.filter((value) => {
      return value.testcase_id !== index
    })
    setTask(task_tmp)
    setDumb(!dumb)
  }

  if (deletedTestcase) {
    return <></>
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }} key={`${id}`}>
      <TextField
        label={`Input-${index + 1}`}
        type="text"
        defaultValue={testcase.input}
        variant="outlined"
        rows={3}
        maxRows={10}
        fullWidth
        multiline
        onChange={(event) => {
          updateInputTestcase(event)
        }}
        style={{marginRight: "10px"}}
      />
      <TextField
        label={`Output-${index + 1}`}
        type="text"
        defaultValue={testcase.output}
        variant="outlined"
        rows={3}
        maxRows={10}
        fullWidth
        multiline
        onChange={(event) => {
          updateOutputTestcase(event)
        }}
        style={{marginRight: "10px"}}
      />
      <Button style={{ top: "8px"}} onClick={() => {
          handleDeleteTestcase(id)
        }}>{t("addTaskForm.delete")}</Button>
    </div>
  )
}
