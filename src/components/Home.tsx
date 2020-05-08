import React, { useContext } from 'react';
import { Store } from './contexts/UserContext';
import AllProducts from './products/Allproducts';
import ScraperDetails from './scraper/ScraperDetails';

const Home: React.FC = () => {
	const { state } = useContext(Store) 

	return (
		<React.Fragment>
			<ScraperDetails />
			{ state.isAuthenticated ? <AllProducts /> : null }
		</React.Fragment>
	)
}

export default Home