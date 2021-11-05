
const Storage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems: []));
}

export const sumItems = cartItems => {
    Storage(cartItems);
    let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
    let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
    return { itemCount, total }
}

export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            // if (!state.cartItems.find(item => item.id === action.payload.id)) {
            //     state.cartItems.push({
            //         ...action.payload,
            //         quantity: 1
            //     })
            // } 
            state.cartItems.push({
                ...action.payload,
                idItem: Math.random().toString(36).substr(2, 9),
                quantity: 1
            })
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "REMOVE_ITEM":
            return {
                ...state,
                ...sumItems(state.cartItems.filter(item => item.idItem !== action.payload.idItem)),
                cartItems: [...state.cartItems.filter(item => item.idItem !== action.payload.idItem)]
            }
        case "INCREASE":
            state.cartItems[state.cartItems.findIndex(item => item.idItem === action.payload.idItem)].quantity++
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "DECREASE":
            state.cartItems[state.cartItems.findIndex(item => item.idItem === action.payload.idItem)].quantity--
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "CHECKOUT":
            return {
                cartItems: [],
                checkout: true,
                ...sumItems([]),
            }
        case "CLEAR":
                return {
                    cartItems: [],
                    ...sumItems([]),
                }
        default:
            return state

    }
}