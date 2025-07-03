const initiaData = {
    card_items: []
}

const cartReducer = (state = initiaData, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                card_items: [...state.card_items, action.payload]
            }
        default:
            return state;
    }
}

export default cartReducer;