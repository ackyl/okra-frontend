const init = {
    id: '',
    stock: ''
}

export default (data = init, action) => {
    switch (action.type) {
        case 'ALBUM_SELECTED':
            return {
                ...data,
                ...init,
                id: action.payload.id,
                stock: action.payload.stock
            }
                
        default:
            return data
    }
}