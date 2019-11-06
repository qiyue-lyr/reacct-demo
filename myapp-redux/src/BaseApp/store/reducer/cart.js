export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_CART_ITEM':
            return [...state,action.payload];
        default:
            return state;
    }
}