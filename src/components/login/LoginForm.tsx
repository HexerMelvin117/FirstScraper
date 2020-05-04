import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

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

  const handleSubmit = () => {
    
  }

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >

    </Formik>
  )
}

export default LoginForm