const init = {
    id: '',
    stock: '',
    tdid: ''
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

        case 'TRANS_SELECTED':
            return {
                ...data,
                ...init,
                tdid: action.payload.tdid
            }
                
        default:
            return data
    }
}