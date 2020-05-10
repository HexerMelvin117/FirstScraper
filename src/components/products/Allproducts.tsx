import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Store } from '../contexts/UserContext';
import { ProductStore } from '../contexts/ProductsContext';
import ProductCard from './ProductCard';
import { Grid } from '@material-ui/core';
require('dotenv').config()

const Allproducts: React.FC = () => {
	const { state } = useContext(Store);

	// This is the product context
	const prodCon = useContext(ProductStore);

	interface Product {
		prod_id: number,
		prod_title: string,
		prod_value: string,
		prod_img: string,
		prod_url: string
	}

	useEffect(() => {
		(async () => {
			async function fetchSavedProducts () {
				let response = await axios.post(`https://firstscraper-rest.herokuapp.com/auth/allproducts`, { token: state.token })
				return response.data
			}
			const myProducts = await fetchSavedProducts();
			prodCon.dispatch({
				type: 'FILL_PRODUCTS',
				payload: myProducts
			})
		})()
	}, []);

	return(
		<React.Fragment>
			<Grid container>
			{ prodCon.state.data.map((product: Product) => (
				<Grid item xs={12} md={4} key={product.prod_id}>
					<ProductCard
						productTitle={product.prod_title} 
						value={product.prod_value} 
						imgSrc={product.prod_img} 
						url={product.prod_url}
						prodId={product.prod_id} 
					/>
				</Grid>
			)) }
			</Grid>
		</React.Fragment>
	)
}

export default Allproducts