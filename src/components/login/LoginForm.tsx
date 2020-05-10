import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import axios, { AxiosResponse } from 'axios';
import * as Yup from 'yup';
import MaterialUIText from '../formcontrollers/MaterialUIText';
import { Button } from '@material-ui/core';
import { Store } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const {state, dispatch} = useContext(Store);
  const [buttonDisable, setButtonDisable] = useState(false)

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

  const fetchLoginAction = (apiResponse: AxiosResponse<any>) => {
    return dispatch({
      type: 'LOG_IN',
      payload: apiResponse
    })
  }

  let history = useHistory()

  const handleSubmit = async (values: User) => {
    let { username, password } = values;
    setButtonDisable(true)
    let response = await axios.post('http://localhost:8080/auth/login', { username, password })
    setButtonDisable(false)
    fetchLoginAction(response.data)
    history.push('/')
  };
  console.log(state)

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      {() => {
          return (
            <Form>
              <MaterialUIText name="username" label="Username" required={true} variant="outlined" />
              <br />
              <MaterialUIText name="password" label="Password" required={true} type="password" variant="outlined" />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={buttonDisable}
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