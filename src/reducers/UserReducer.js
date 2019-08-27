const init = {
    id: ''
}

export default (data = init, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...data,
                id: action.payload
            }
                
        default:
            return data
    }
}