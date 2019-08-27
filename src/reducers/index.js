import { combineReducers } from 'redux'

import AlbumReducer from './AlbumReducer'
import UserReducer from './UserReducer'


export default combineReducers(
    {
        album: AlbumReducer,
        user: UserReducer
    }
)