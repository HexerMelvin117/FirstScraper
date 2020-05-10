import React, { createContext, useReducer } from 'react';

interface ProductData {
    data: any[]
}

interface Action {
	type: string,
	payload: any
}

let initialState : ProductData = {
  data: []
}

export const ProductStore = createContext<ProductData | any>(initialState)
const reducer = (state: ProductData, action: Action): ProductData => {
	switch (action.type) {
		case 'FILL_PRODUCTS':
			let productsArray: any[] = [];
			action.payload.map((product: any) => productsArray.push(product))
			return {...state, data: productsArray}
		case 'REMOVE_PRODUCT':
			let productArray: any[] = state.data;
			let idToRemove = action.payload
			let revisedArray = productArray.filter((product: any) => product.prod_id !== idToRemove);
			return {...state, data: revisedArray }
		default:
			return state
	}
}

const ProductProvider = (props: any): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <ProductStore.Provider value={{state, dispatch}}>
            {props.children}
        </ProductStore.Provider>
    )
}

export default ProductProvider;