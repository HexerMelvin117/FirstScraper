import React from 'react';
import SignupForm from './SignupForm';
import { Grid, Typography, Paper } from '@material-ui/core';

const Signup: React.FC = () => {
  return (
		<React.Fragment>
			<Grid 
				container 
				direction="column" 
				alignItems="center" justify="center" 
				spacing={0} 
				style={{ minHeight: "50vh" }}
			>
				<Grid item className="mainlogin" md={4} style={{margin: 60}}>
					<Paper style={{padding: 50}} elevation={5}>
						<Typography variant="h5">Register</Typography>
						<SignupForm />
					</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Signup;