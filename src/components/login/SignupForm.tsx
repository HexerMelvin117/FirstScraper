import React from  'react';
import { Formik, Form } from 'formik';
import MaterialUIText from '../formcontrollers/MaterialUIText';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';

const SignupForm: React.FC = () => {
	interface UserInfo {
		email: string,
		name: string,
		password: string,
		confirmPassword: string
	}

	const userInfo: UserInfo = {
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

	const handleSubmit = (values: UserInfo): void => {
		alert(values)
	}


	return (
		<Formik
			initialValues={userInfo}
			onSubmit={handleSubmit}
			validationSchema={signupSchema}
		>
			{() => (
				<Form>
					<MaterialUIText name="username" label="Username" required={true} />
          <MaterialUIText name="email" label="Email" required={true} />
					<MaterialUIText name="password" label="Password" required={true} />
          <MaterialUIText name="confirmPassword" label="Confirm Password" required={true} />
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