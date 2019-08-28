const init = {
    user_id: '',
    username: '',
    error: '',
    success: '',
}

export default (data = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...data, user_id: action.payload.user_id, username: action.payload.username}
        
        case 'AUTH_ERROR':
            return{...data, ...init, error: action.payload}
        
        case 'AUTH_NO_MESS':
            return {...data, error: '', success: ''}
        
        case 'AUTH_SUCCESS':
            return{...data, ...init, success: action.payload}

        case 'LOGOUT':
            return{...data, ...init}
                
        default:
            return data
    }
}