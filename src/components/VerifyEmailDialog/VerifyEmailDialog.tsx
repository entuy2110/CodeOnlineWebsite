import { Dialog, DialogTitle, Divider, Typography, makeStyles, Input, TextField, Button } from "@material-ui/core";
import { ContactsOutlined } from "@material-ui/icons";
import { getUser, verifyEmail } from "api/api";
import { HorizontalForm } from "components/Form/Form";
import { Stack } from "components/Stack/Stack";
import { useFormik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { getFormHelpers } from "util/formUtils";
import * as Yup from "yup"

type InputOrNull = HTMLInputElement | null;

export const VerifyEmailDialog = (props: any) => {
  const { onClose, open, onUpdateUser } = props;
  // const code_length = 4
  // const [code, setCode] = useState<string[]>(Array(code_length).fill(""))
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isValid, setIsValid] = useState(true);
  const styles = useStyles()

  const formRef = useRef<HTMLFormElement>(null);

  // const update = useCallback((index: number, val: string) => {
  //   return setCode((prevState) => {
  //     const slice = prevState.slice();
  //     slice[index] = val;
  //     return slice;
  //   });
  // }, []);

  // const validationSchema = Yup
  // .array()
  // .required()
  // .of(Yup.number().required())

  const formik = useFormik({
    initialValues: {
      code: ""
    },

    // validationSchema,
    onSubmit: async (values) => {
      const response = await verifyEmail(values.code)
      if (response === 1) {
        const user = await getUser()
        onUpdateUser(user)
        handleClose()
      } else {

      }
    },
  });

  const getFieldHelpers = getFormHelpers(formik)

  // const handleKeyDown = (index: number, event: any) => {
  //   const form = formRef.current;

  //   if (form) {
  //     const prevIndex = index - 1;
  //     const nextIndex = index + 1;
  //     const prevInput: InputOrNull = form.querySelector(`.input-${prevIndex}`);
  //     const nextInput: InputOrNull = form.querySelector(`.input-${nextIndex}`);
  //     switch (event.key) {
  //       case "Backspace":
  //         if (code[index]) update(index, "")
  //         else if (prevInput) prevInput.select()
  //         break;
  //       case "ArrowRight":
  //         event.preventDefault()
  //         if (nextInput) nextInput.focus()
  //         break;
  //       case "ArrowLeft":
  //         event.preventDefault()
  //         if (prevInput) prevInput.focus()
  //         break;
  //       case "Enter": 
  //         handleSubmit()
  //         break;
  //     }
  //   }
  // }

  // const handleChange = (index: number, event: any) => {
  //   const input = event.currentTarget.value
  //   const value = input[input.length - 1]
  //   const form = formRef.current
  //   if (form && value) {
  //     let nextIndex = index + 1 
  //     let nextInput: InputOrNull = form.querySelector(`.input-${nextIndex}`)
  //     update(index, value) 
  //     if (value.length === 1) {
  //       nextInput?.focus()
  //     }
  //   }
  // }

  // const handleFocus = (event: any) => {
  //   event.currentTarget.select()
  // }

  // useEffect(() => {
  //   if (isSubmitted) {
  //     try {
  //       setIsValid(validationSchema.isValidSync(code));
  //     } catch (e) {}
  //   }
  // }, [code])

  // const handleSubmit = async () => {
  //   setIsSubmitted(true);
  //   try {
  //     const data = await validationSchema.validate(code)
  //     alert(`Code is ${data?.join("")}`)
  //     handleClose()
  //   } catch (e) {
  //     setIsValid(false)
  //   }
  // }

  const handleClose = () => {
    // setIsSubmitted(false)
    onClose()
  };
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true} ref={formRef} >
      <DialogTitle id="simple-dialog-title">Xác thực Email</DialogTitle>
      <Divider />
      <br></br>
      <Typography
        style={{
          textAlign: "center",
        }}
      >
        Nhập mã xác thực đã được gửi tới email
      </Typography>
      <br></br>
      <Stack
        direction="row"
        spacing={1.2}
        justifyContent="center"
      >
        {/* {code.map((value, i) => (
          <Input
            className={styles.verifyInput}
            key={i}
            value={value}
            error={isSubmitted && !isValid}
            inputProps={{
              type: "number",
              className: `input-${i}`,
              "aria-label": `Number ${i + 1}`,
              "data-index": i,
              min: 0,
              max: 9,
              style: { textAlign: 'center' },
              onChange: (event) => handleChange(i, event),
              onKeyDown: (event) =>{ 
                ["e", "E", "+", "-", ".", ","].includes(event.key) && event.preventDefault()
                handleKeyDown(i ,event)},
              onFocus: handleFocus,
            }}
          />
        ))} */}
        <HorizontalForm onSubmit={formik.handleSubmit}>
          <div>
          <TextField
          {...getFieldHelpers("code")}
          onChange={formik.handleChange}
          required
            />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Button 
              type="submit" 
              variant="contained" 
              style={{ marginTop: "8px" }} 
            >
              OK
            </Button>
          </div>
        </HorizontalForm>
      </Stack>
      <br></br>
      <br></br>

    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  verifyInput: {
    width: "2rem",
    fontSize: "1.4rem",
    color: "#9CA74F",
    input: { textAlign: "center " },
    appearance: "textfield",
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  }
}))