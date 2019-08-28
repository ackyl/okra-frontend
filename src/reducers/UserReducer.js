const init = {
    id: '',
    username: '',
    error: '',
    success: '',
}

export default (data = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...data, id: action.payload.user_id, username: action.payload.username}
        
        case 'AUTH_ERROR':
            return{...data, ...init, error: action.payload}
        
        case 'AUTH_NO_MESS':
            return {...data, error: '', success: ''}
        
        case 'AUTH_SUCCESS':
            return{...data, ...init, success: action.payload}

        case 'LOGIN':
            return {...data, id: action.payload}
                
        default:
            return data
    }
}