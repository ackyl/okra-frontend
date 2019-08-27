export const selectedAlbum = (album) => {
    
    return {
        type: 'ALBUM_SELECTED',
        payload: album
    }
}

export const login = (user) => {
    return{
        type: 'LOGIN',
        payload: user
    }
}