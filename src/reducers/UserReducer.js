const init = {
    user_id: '',
    username: '',
    user_type: '',
    error: ''
}

export default (data = init, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return{...data, ...init, user_id: action.payload.user_id, username: action.payload.username, user_type: action.payload.user_type}

        case 'LOGIN_SUCCESS':
            return {...data, ...init, user_id: action.payload.user_id, username: action.payload.username, user_type: action.payload.user_type}
        
        case 'REGISTER_ERROR':
            return{...data, ...init, error: action.payload}

        case 'LOGOUT':
            return{...data, ...init}
                
        default:
            return data
    }
}