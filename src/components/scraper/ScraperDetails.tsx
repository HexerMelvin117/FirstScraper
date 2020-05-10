import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import Image from 'material-ui-image';
import { Store } from '../contexts/UserContext';

const ScraperDetails: React.FC = () => {
	// Stores Zone
	const { state } = useContext(Store)

	// Hooks Zone
	const [searchUrl, setSearchUrl] = useState("")
	const [productUrl, setProductUrl] = useState("")
	const [productTitle, setProductTitle] = useState("")
	const [imageSource, setImageSource] = useState("")
	const [productValue, setProductValue] = useState("")
	const [buttonDisable, setButtonDisable] = useState(false)
	const [saveDisable, setSaveDisable] = useState(false)

	// Actions Zone
	const handleSearch = async () => {
		setButtonDisable(true)
		const response: AxiosResponse<any> = await axios.post(`https://firstscraper-rest.herokuapp.com/scrape/amazonproduct`, {productLink: searchUrl})
		const result = response.data;
		let {productUrl, titleText, imageSourceTxt, priceValue} = result
		setProductUrl(productUrl)
		setProductTitle(titleText)
		setImageSource(imageSourceTxt)
		setProductValue(priceValue)
		setButtonDisable(false)
	}

	const saveInformation = async () => {
		let response = await axios.post('https://firstscraper-rest.herokuapp.com/auth/saveproduct', 
		{productUrl: productUrl, productTitle: productTitle,
		productImage: imageSource, productValue: productValue, token: state.token});
	}

	return (
		<Grid container>
			<Grid 
				container
				direction="column" 
				alignItems="center" justify="center" 
				spacing={0} 
				style={{ minHeight: "20vh" }}
			>
				<Grid item xs={12} md={4} style={{margin: 10}}>
					<Paper style={{padding: 10}} elevation={5}>
						<TextField name="url" label="Url" type="text" onChange={(e) => setSearchUrl(e.target.value)} />
						<Button 
							variant="contained" 
							disabled={buttonDisable} 
							color="primary" 
							onClick={() => handleSearch()}
						>Scrape</Button>
					</Paper>
				</Grid>
			</Grid>
			<Grid 
				container
				alignItems="center" 
				justify="center" 
				spacing={0} 
				style={{ minHeight: "10vh" }}
			>
				<Paper elevation={5} style={{padding: 10}}>
					<Grid item xs={12} md={12}>
						<Typography variant="subtitle1">{productTitle}</Typography>
					</Grid>
					<Grid item xs={12} md={12} style={{textAlign: "center"}}>
						<div style={{width: "200px", height: "200px", display: "inline-block"}}>
							{imageSource ? <Image src={imageSource} style={{display: "block"}}></Image> : null}
						</div>
					</Grid>
					<Grid item xs={12} md={12} style={{textAlign: "center"}}>
						<Typography variant="h5">{productValue}</Typography>
					</Grid>
					<Grid container>
						<Grid item xs={12} md={6} style={{textAlign: "center"}}>
							{productTitle ? <Button href={productUrl} target="_blank" variant="contained">View in Amazon</Button> : null}
						</Grid>
						<Grid item xs={12} md={6}>
							{state.isAuthenticated && productTitle ? 
							<Button 
								onClick={async () => {
									saveInformation()
								}}
								variant="contained"
								color="primary"
								disabled={saveDisable}
							>
							Save Product
							</Button> : null}
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default ScraperDetails