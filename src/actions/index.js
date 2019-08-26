export const selectedAlbum = (album) => {

    console.log(album)
    
    return {
        type: 'ALBUM_SELECTED',
        payload: album
    }
}