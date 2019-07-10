import {combineReducers} from 'redux'
import userReducers from './user'
import pilihanReducers from './pilihan.'
import MovieReducers from './moviepilihan'
import SeatReducers from './seatjudul'

export default combineReducers({
    user:userReducers,
    bebas:pilihanReducers,
    movie:MovieReducers,
    seat:SeatReducers,
})