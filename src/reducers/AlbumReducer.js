const init = {
    id: ''
}

export default (data = init, action) => {
    switch (action.type) {
        case 'ALBUM_SELECTED':
            return {
                ...data,
                id: action.payload
            }
                
        default:
            return data
    }
}