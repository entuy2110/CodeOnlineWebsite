import { Button, FormControl, FormControlLabel, FormLabel, Switch, TextareaAutosize, Typography, makeStyles } from "@material-ui/core"
import { FormSection_2 } from "components/Form/Form"
import { ChangeEvent, FC, createContext, useContext, useEffect, useMemo, useState } from "react"
import AddIcon from "@material-ui/icons/AddOutlined"
import { Exercise, Testcase } from "api/typesGenerated"
import { combineClasses } from "util/combineClasses"
import { TestcaseInput } from "./Testcase"
import TextField from '@material-ui/core/TextField';
import { useTranslation } from "react-i18next"
import { TaskListContext } from "pages/AddTaskPage/AddTaskPageView"

export interface TaskProps {
  id: number
}

type UserContextType = {
  task: Exercise,
  setTask: React.Dispatch<React.SetStateAction<Exercise>>
  dumb: boolean 
  setDumb: React.Dispatch<React.SetStateAction<boolean>>
}

const iUserContextState = {
  task: {
    task_id: 0,
    desc: "",
    point: undefined,
    cases: [],
  },
  setTask: () => {},
  dumb: false,
  setDumb: () => {}
}

export const TaskContext = createContext<UserContextType>(iUserContextState);

export const Task: FC<TaskProps> = ({
  id,
}) => {

  const { t } = useTranslation("editTaskPage")
  const styles = useStyles()
  const [deletedTask, setDeletedTask] = useState(false)
  const {taskList, setTaskList, dummy, setDummy} = useContext(TaskListContext)

  var index = -2
  var initTask: Exercise = {
    task_id: 0,
    desc: "",
    cases: []
  }
  taskList.map((value, i) => {
    if (value.task_id === id) {
      index = i
      initTask = value
    }
  })  

  const [task, setTask] = useState<Exercise>(initTask)
  const [dumb, setDumb] = useState(false)

  var initTestcaseJSX: JSX.Element[] = []
  if (task.cases) {
    task.cases.map((test, index) => {
      const tmp = (
        <TestcaseInput
          key={index}
          id={test.testcase_id}
        />
      )
      initTestcaseJSX = [...initTestcaseJSX, tmp]
    })
  }

  const [testcaseJSX, setTestcaseJSX] = useState<JSX.Element[]>(initTestcaseJSX)

  // update testcase
  useEffect(() => {
    var taskList_tmp = taskList
    taskList[index] = task
    setTaskList(taskList_tmp)
    setDummy(!dummy)
  },[dumb])

  const updateDesc = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    var task_tmp = task
    task_tmp.desc = event.target.value
    setTask(task_tmp)
    setDummy(!dummy)
  }

  const updatePoint = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    var task_tmp = task
    task_tmp.point = parseInt(event.target.value)
    setTask(task_tmp)
    setDummy(!dummy)
  }

  const addTestcase = () => {
    var task_tmp = task
    var id
    if (task_tmp.cases.length === 0) {
      id = 0
      task_tmp.cases[0] = {
        testcase_id: 0,
        input: "",
        output: ""
      }
    } else {
      id = task_tmp.cases[task_tmp.cases.length - 1].testcase_id + 1
      task_tmp.cases[task_tmp.cases.length] = {
        testcase_id: task_tmp.cases[task_tmp.cases.length - 1].testcase_id + 1, 
        input: "",
        output: ""
      }
    }

    setTask(task_tmp)
    const testcaseIndex = testcaseJSX.length

    const tmp = (
      <TestcaseInput
        key={testcaseIndex}
        id={id}
      />
    )
    setTestcaseJSX((testcaseJSX) => [...testcaseJSX, tmp])
  }

  const handleDeleteTask = () => {
    setDeletedTask(true)
    var taskList_tmp = taskList
    taskList_tmp = taskList_tmp.filter((value) => {
      return value.task_id !== id
    })
    setTaskList(taskList_tmp)
    setDummy(!dummy)
  }

  if (deletedTask) {
    return <></>
  }

  return (
    <div
      style={{
        backgroundColor: "rgb(36 35 40)",
        marginBottom: "5px",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <div className={styles.formSection_2}>
        <div
          className={styles.formSectionInfo}
        >
          <h2
            className={styles.formSectionInfoTitle}
          >
            {`${t("addTaskForm.task")} ${index + 1}`}
          </h2>

          <div style={{ marginLeft: "8px" }}>
            <FormControl style={{top: "9px"}}>{t("addTaskForm.point")}: &nbsp;&nbsp;</FormControl>

            <TextField
              label=""
              type="number"
              style={{width: "120px"}}
              onChange={(event) => {
                updatePoint(event)
              }}
              defaultValue={task.point}
            />
          </div>

          <div style={{ cursor: "pointer", marginLeft: "8px" }}>
            <Button style={{ top: "8px", marginBottom: "20px"}} onClick={handleDeleteTask}>
              {t("deleteTask")}
            </Button>
          </div>
          <div className={styles.formSectionInfoDescription}>{""}</div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              label={t("addTaskForm.desc")}
              type="text"
              defaultValue={task.desc}
              variant="outlined"
              rows={3}
              maxRows={10}
              fullWidth
              multiline
              onChange={(event) => {
                updateDesc(event)
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TaskContext.Provider value={{task, setTask, dumb, setDumb}}>
              {testcaseJSX}
            </TaskContext.Provider>

            <Button style={{ top: "8px", marginBottom: "20px"}} onClick={addTestcase}>
              <AddIcon fontSize="small" /> {t("addTaskForm.addTestcase")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(7),

    [theme.breakpoints.down("sm")]: {
      gap: theme.spacing(8),
    },
  },

  form_2: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      gap: theme.spacing(8),
    },
  },

  formSection_2: {
    display: "flex",
    alignItems: "flex-start",
    gap: theme.spacing(5),
    flexDirection: "row",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(2),
    },
  },
  formSectionInfo: {
    width: "100%",
    maxWidth: 312,
    flexShrink: 0,
    // position: "sticky",
    top: theme.spacing(3),

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      position: "initial",
    },
  },

  formSectionInfoTitle: {
    fontSize: 20,
    color: theme.palette.text.primary,
    fontWeight: 400,
    margin: 0,
    marginBottom: theme.spacing(1),
    marginLeft: 10
  },
  formSectionInfoTitle_2: {
    fontSize: 16,
    color: theme.palette.text.primary,
    fontWeight: 400,
    margin: 0,
    marginBottom: theme.spacing(1),
    marginLeft: 10
  },

  formSectionInfoDescription: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    lineHeight: "160%",
    margin: 0,
  },

  formSectionFields: {
    width: "100%",
  },
}))