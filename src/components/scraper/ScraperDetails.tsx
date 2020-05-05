import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import Image from 'material-ui-image';

const ScraperDetails: React.FC = () => {
	const [searchUrl, setSearchUrl] = useState("")
	const [productUrl, setProductUrl] = useState("")
	const [productTitle, setProductTitle] = useState("")
	const [imageSource, setImageSource] = useState("")
	const [productValue, setProductValue] = useState("")

	const handleSearch = async () => {
		const response: AxiosResponse<any> = await axios.post('http://localhost:8080/scrape/amazonproduct', {productLink: searchUrl})
		const result = response.data;
		let {productUrl, titleText, imageSourceTxt, priceValue} = result
		setProductUrl(productUrl)
		setProductTitle(titleText)
		setImageSource(imageSourceTxt)
		setProductValue(priceValue)
	}

	const saveInformation = async () => {
		await axios.post('http://localhost:8080/scrape/saveproduct', 
		{productUrl: productUrl, productTitle: productTitle,
			productImage: imageSource, productValue: productValue})
	}

	return (
		<Grid container>
			<Grid item xs={12}>
				<TextField name="url" label="Url" type="text" onChange={(e) => setSearchUrl(e.target.value)} />
				<Button variant="contained" color="primary" onClick={() => handleSearch()}>Scrape</Button>
			</Grid>
			<Grid item xs={12}>
				<Grid item xs={12} md={6}>
					<Typography variant="h5">{productUrl}</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h5">{productTitle}</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					{imageSource ? <Image src={imageSource}></Image> : null}
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h5">{productValue}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Button onClick={async () => await saveInformation()}>Save Product</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default ScraperDetails