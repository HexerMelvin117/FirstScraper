import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Store } from '../contexts/UserContext';
import ProductCard from './ProductCard'

const Allproducts: React.FC = () => {
	const {state} = useContext(Store)
	const [allProducts, setAllProducts] = useState([])

	interface Product {
		prod_title: string,
		prod_value: string,
		prod_img: string,
		prod_url: string
	}

	useEffect(() => {
		(async () => {
			async function fetchSavedProducts () {
				let response = await axios.post('http://localhost:8080/auth/allproducts', { token: state.token })
				return response.data
			}
			const myProducts = await fetchSavedProducts();
			setAllProducts(myProducts)
			console.log(allProducts);
		})()
	}, [])

	return(
		<React.Fragment>
			{ allProducts.map((product: Product) => (
				<div>
					<ProductCard 
						productTitle={product.prod_title} 
						value={product.prod_value} 
						imgSrc={product.prod_img} 
						url={product.prod_url} 
					/>
				</div>
			)) }
		</React.Fragment>
	)
}

export default Allproducts