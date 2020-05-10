import React, { useContext } from 'react';
import { Store } from './contexts/UserContext';
import AllProducts from './products/Allproducts';
import ScraperDetails from './scraper/ScraperDetails';
import { Typography, Button } from '@material-ui/core';
import { ProductStore } from './contexts/ProductsContext';
import axios from 'axios';
require('dotenv').config()

const Home: React.FC = () => {
	const { state } = useContext(Store)
	const prodCon = useContext(ProductStore);

	const fetchSavedProducts = async () => {
		let response = await axios.post(`https://firstscraper-rest.herokuapp.com/auth/allproducts`, { token: state.token });
		console.log(response);
		return response.data;
	}

	const reloadProducts = async () => {
		const myProducts = await fetchSavedProducts();
		prodCon.dispatch({
			type: 'FILL_PRODUCTS',
			payload: myProducts
		});
	}

	return (
		<React.Fragment>
			<ScraperDetails />
			<br />
			{ state.isAuthenticated ? 
			<div>
				<Typography variant="h5">My Saved Products</Typography>
				<Button variant="contained" onClick={() => reloadProducts()}>Refresh</Button>
				<br />
				<AllProducts />
			</div>
			: null }
		</React.Fragment>
	)
}

export default Home