let curUser = {
    uid: 0,
    username: ''
};

export default (state = curUser, action) => {
    switch (action.type) {
        case 'ADD_USER_STATUS':
            return action.payload;
        case 'DEL_USER_STATUS':
            return action.payload;
        default:
            return state;
    }
}