import React from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import MaterialUIText from '../formcontrollers/MaterialUIText';
import { Button } from '@material-ui/core'

const LoginForm: React.FC = () => {

  interface User {
    username: string,
    password: string
  }

  const initialValues: User = {
    username: "",
    password: ""
  }

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required"),
    password: Yup.string()
      .required("Required")
  })

  const handleSubmit = (values: User): void => {
    alert(values.username);
  };

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      {() => {
          return (
            <Form>
              <MaterialUIText name="username" label="Username" required={true} />
              <MaterialUIText name="password" label="Password" required={true} />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Log in
              </Button>
            </Form>
          )
        }
      }
    </Formik>
  )
}

export default LoginForm