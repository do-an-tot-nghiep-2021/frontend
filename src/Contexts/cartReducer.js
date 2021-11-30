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
            state.cartItems.push({
                id : action.payload.id,
                image : action.payload.image,
                name : action.payload.name,
                topping : action.payload.topping,
                type : action.payload.type,
                price : action.payload.price,
                idItem: Math.random().toString(36).substr(2, 9),
                quantity: action.payload.quantity,
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