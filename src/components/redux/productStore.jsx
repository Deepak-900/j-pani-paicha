const intialData = {
    products: []
}
const productReducer = (state = intialData, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'FETCH_PRODUCTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_PRODUCTS_SUCCESS':
            return { ...state, loading: false, products: action.payload };
        case 'FETCH_PRODUCTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default productReducer;  