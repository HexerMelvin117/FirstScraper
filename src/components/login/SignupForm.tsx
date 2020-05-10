import React from  'react';
import { Formik, Form } from 'formik';
import MaterialUIText from '../formcontrollers/MaterialUIText';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const SignupForm: React.FC = () => {
	interface UserInfo {
		email: string,
		name: string,
		password: string,
		confirmPassword: string
	}

	const initialValues: UserInfo = {
		email: "",
		name: "",
		password: "",
		confirmPassword: ""
	}

	const signupSchema = Yup.object().shape({
		email: Yup.string()
			.required("Required"),
		name: Yup.string()
			.required("Required"),
		password: Yup.string()
			.required("Required"),
		confirmPassword: Yup.string()
			.required("Required")
	})

	let history = useHistory();

	const handleSubmit = async (values: UserInfo) => {
		await axios.post('http://localhost:8080/auth/signup', {email: values.email, name: values.name, 
		password: values.password, confirmPassword: values.confirmPassword});
		history.push('/login');
	}


	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={signupSchema}
		>
			{() => (
				<Form>
					<MaterialUIText name="email" label="Email" required={true} />
					<MaterialUIText name="name" label="Name" required={true} />
					<MaterialUIText name="password" label="Password" required={true} type="password" />
          <MaterialUIText name="confirmPassword" label="Confirm Password" required={true} type="password" />
					<br />
					<Button
						variant="contained"
						color="primary"
						type="submit"
					>
						Sign up
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default SignupForm