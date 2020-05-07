import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import axios, { AxiosResponse } from 'axios';
import * as Yup from 'yup';
import MaterialUIText from '../formcontrollers/MaterialUIText';
import { Button } from '@material-ui/core';
import { Store } from '../contexts/UserContext';

const LoginForm: React.FC = () => {
  const {state, dispatch} = useContext(Store);

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

  const handleLogout = () => {
    return dispatch({
      type: 'LOG_OUT'
    })
  }

  const handleSubmit = async (values: User) => {
    let { username, password } = values;
    console.log(values)
    let response = await axios.post('http://localhost:8080/auth/login', { username, password })
    fetchLoginAction(response.data)
    console.log(response)
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
              <MaterialUIText name="username" label="Username" required={true} />
              <MaterialUIText name="password" label="Password" required={true} type="password" />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Log in
              </Button>
              <Button
                variant="contained"
                onClick={() => handleLogout()}
              >
                Log out
              </Button>
            </Form>
          )
        }
      }
    </Formik>
  )
}

export default LoginForm