//import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import sudoku from '../reducers/sudoku'
import auth from '../reducers/auth'
import myStatistics from '../reducers/myStatistics'
import myResult from '../reducers/result'

const rootReducer = combineReducers({
    myResult,
    sudoku,
    auth,
    myStatistics
})

// const store = configureStore ({
//     reducer: {rootReducer}
// })
const store = createStore(rootReducer, compose(applyMiddleware(thunk)))
export default store