const initiaData = {
    card_items: []
}

const cartReducer = (state = initiaData, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                card_items: [...state.card_items, action.payload]
            }
        case 'REMOVE_FROM_CART':
            return {
                card_items: state.card_items.filter(item => item.id != action.payload)
            }
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                card_items: state.card_items.map(item =>
                    item.id === action.payload
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            total: item.price * (item.quantity + 1)
                        }
                        : item
                )
            };

        case 'DECREASE_QUANTITY':
            return {
                ...state,
                card_items: state.card_items.map(item =>
                    item.id === action.payload && item.quantity > 1
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                            total: item.price * (item.quantity - 1)
                        }
                        : item
                )
            };
        case 'CLEAR_CART':
            return {
                ...state,
                card_items: []
            };
        default:
            return state;
    }
}

export default cartReducer;