const init = {
    user_id: '',
    username: '',
    user_type: '',
    error: '',
    tempo: ''
}

export default (data = init, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return{...data, ...init, user_id: action.payload.user_id,
                username: action.payload.username,
                name: action.payload.name,
                email: action.payload.email,
                user_type: action.payload.user_type,
                profile_picture: action.payload.profile_picture    
            }

        case 'LOGIN_SUCCESS':
            return {...data, ...init, user_id: action.payload.user_id,
                username: action.payload.username,
                name: action.payload.name,
                email: action.payload.email,
                user_type: action.payload.user_type,
                profile_picture: action.payload.profile_picture
            }
        
        case 'REGISTER_ERROR':
            return{...data, ...init, error: action.payload}

        case 'LOGIN_ERROR':
            return{...data, ...init, error: action.payload}

        case 'LOGOUT':
            return{...data, ...init}

        case 'TEMPO':
            return{...data, tempo: action.payload.tempo}
                
        default:
            return data
    }
}