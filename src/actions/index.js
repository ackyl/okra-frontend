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
                            // Render success message
                            dispatch({
                                type: 'AUTH_SUCCESS',
                                payload: "Registration Succeeded"
                            })
                            // Clean success message
                            setTimeout(() => {
                                dispatch({
                                    type: 'AUTH_NO_MESS'
                                })
                            }, 3000);
                        }).catch(err => {
                            // Render error message, system error
                            dispatch({
                                type: 'AUTH_ERROR',
                                payload: "System Error"
                            })
                            // Clean success message
                            setTimeout(() => {
                                dispatch({
                                    type: 'AUTH_NO_MESS'
                                })
                            }, 2000);
                        })
                    } else {
                        // Render error message, username taken
                        dispatch({
                            type: 'AUTH_ERROR',
                            payload: "Email has been taken"
                        })
                        // Clean error message
                        setTimeout(() => {
                            dispatch({
                                type: 'AUTH_NO_MESS'
                            })
                        }, 2000);
                    }
                })

                
            } else {
                // Render error message, username taken
                dispatch({
                    type: 'AUTH_ERROR',
                    payload: "Username has been taken"
                })
                // Clean error message
                setTimeout(() => {
                    dispatch({
                        type: 'AUTH_NO_MESS'
                    })
                }, 2000);
            }
        }).catch(err => {
            // Render error message, system error
            dispatch({
                type: 'AUTH_ERROR',
                payload: "System Error"
            })
            // Clean error message
            setTimeout(() => {
                dispatch({
                    type: 'AUTH_NO_MESS'
                })
            }, 2000);
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

                console.log(res.data.user_id)

                if(res.data.user_id !== undefined){
                    
                    const { user_id, username } = res.data

                    cookie.set('login', {user_id, username}, {path:"/"})

                    console.log("Login Success")

                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: { user_id, username }
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
        payload: {user_id: user.user_id, username: user.username}
    }
}

export const onLogout = () => {
    return dispatch => {
        cookie.remove('login')
        dispatch({ type: 'LOGOUT'})
    }
}

export const selectedAlbum = (album) => {
    
    return {
        type: 'ALBUM_SELECTED',
        payload: album
    }
}