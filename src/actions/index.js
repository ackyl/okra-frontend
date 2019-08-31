import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onRegisterUser = (username,name,email,password) => {
    return dispatch => {

        // Check Username
        axios.get('http://localhost:2019/users', {
            params: {
                username
            }
        }).then(res => {
            // Username not found
            if(res.data.length === 0){
                // Check Email
                axios.get('http://localhost:2019/users', {
                    params: {
                        email
                    }
                }).then(res => {
                    // Email not found
                    if (res.data.length === 0) {

                        const user_type = 'user'
                        const profile_picture = 'default.jpg'
                        // Post new data
                        axios.post('http://localhost:2019/users', {
                            username,name,email,password,user_type,profile_picture
                        }).then(res => {
                            
                            const user_id = parseInt(res.data)

                            cookie.set('login', {user_id, username, name, email, user_type, profile_picture}, {path:"/"})

                            dispatch({
                                type: 'REGISTER_SUCCESS',
                                payload: {user_id, username, name, email, user_type, profile_picture}
                            })
                        }).catch(err => {
                            dispatch({
                                type: 'REGISTER_ERROR',
                                payload: "System Error"
                            })
                        })
                    } else {

                        dispatch({
                            type: 'REGISTER_ERROR',
                            payload: "Email has been taken"
                        })
                    }
                }) 
            } else {
                dispatch({
                    type: 'REGISTER_ERROR',
                    payload: "Username has been taken"
                })
            }
        }).catch(err => {
            dispatch({
                type: 'REGISTER_ERROR',
                payload: "System Error"
            })
        })
    }
}

export const onLogin = (username,password) => {

    return (dispatch) => {

        axios.get('http://localhost:2019/users/login',{
            params: {
                username, 
                password
            }
        })
            .then(res => {

                if(res.data.user_id !== undefined){
                    
                    const { user_id, username, name, email, user_type, profile_picture } = res.data

                    cookie.set('login', {user_id, username, name, email, user_type, profile_picture}, {path:"/"})

                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {user_id, username, name, email, user_type, profile_picture}
                    })
                } else {
                    dispatch({
                        type: 'AUTH_ERROR',
                        payload: "Username or Password incorrect"
                    })
                    setTimeout(() => {
                        dispatch({
                            type: 'AUTH_NO_MESS'
                        })
                    }, 2000);
                }
            })
    }
}

export const stayLogin = (user) => {
    
    return {
        type: 'LOGIN_SUCCESS',
        payload: {user_id: user.user_id,
            username: user.username,
            name: user.name,
            email: user.email,
            user_type: user.user_type,
            profile_picture: user.profile_picture}
    }
}

export const onLogout = () => {
    return dispatch => {
        cookie.remove('login')
        dispatch({ type: 'LOGOUT'})
    }
}

export const onUpdateProfile = (user) => {

    cookie.set('login', {
        user_id: user.user_id,
        username: user.username,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        profile_picture: user.profile_picture
    }, {path:"/"})

    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            user_id: user.user_id,
            username: user.username,
            name: user.name,
            email: user.email,
            user_type: user.user_type,
            profile_picture: user.profile_picture
        }
    }
}

export const selectedAlbum = (id, stock) => {
    
    return {
        type: 'ALBUM_SELECTED',
        payload: {id, stock}
    }
}

export const selectedTrans = (tdid) => {
    
    return {
        type: 'TRANS_SELECTED',
        payload: {tdid}
    }
}