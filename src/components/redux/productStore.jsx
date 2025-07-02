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
        default:
            return state;
    }
}

export default productReducer;  