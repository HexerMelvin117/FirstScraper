import React from 'react';
import { TextField } from '@material-ui/core';
import { Field } from 'formik';

interface FieldComponents {
	name: string,
	label: string,
	required?: boolean,
	type?: string,
	variant?: string 
}

const MaterialUIText: React.FC<FieldComponents> = ({ name, label, required = "false", type = "text", variant }) => {
	return (
		<div>
			<Field
				as={TextField}
				name={name}
				label={label}
				required={required}
				type={type}
				variant={variant}
			/>
		</div>
	)
}

export default MaterialUIText