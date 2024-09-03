import * as api from '../api'

export const getSudoku =  (mode) => async (dispatch) => {

    try {
        const {data} = await api.getSudoku(mode)

        dispatch({type:'GET_SUDOKU', data: {...data, mode}}) // the mode is passed in the sudoku to implement correctly the Sudoku saving in the sessionStorage
    } catch (error) {
        console.log(error)
    }
}

export const validateSudoku = (data) => async (dispatch) => {
    try {
        const result = await api.validateSudoku(data);
        dispatch({type:'GET_RESULT', result})
        return true
    } catch (error) {
        dispatch({type:'GET_ERROR', error})
        console.log(error.message);
        return false
    }
}