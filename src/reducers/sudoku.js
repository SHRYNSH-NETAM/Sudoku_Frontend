const sudokuReducer = (sudoku = [], action) => {
    switch (action.type) {
        case "GET_SUDOKU":
            sessionStorage.setItem('currentSudoku', JSON.stringify(action?.data)) // save sudoku in sessionStorage
            return action?.data
        case "UPDATE_SUDOKU":
            let newGridToBeFilled = sudoku["gridToBeFilled"]
            newGridToBeFilled[action?.data?.row][action?.data?.col] = action?.data?.number

            let currentSudoku = JSON.parse(sessionStorage.getItem('currentSudoku') || "{}");
            let updatedHistory = Array.isArray(currentSudoku.history) ? currentSudoku.history : [];
            if (updatedHistory.length > 0 && 
                updatedHistory[updatedHistory.length - 1][1] === action?.data?.row && 
                updatedHistory[updatedHistory.length - 1][2] === action?.data?.col) {
                updatedHistory = [...updatedHistory, [0, action?.data?.row, action?.data?.col]];
            }            
            updatedHistory = [...updatedHistory, [action?.data?.number, action?.data?.row, action?.data?.col]];

            sessionStorage.setItem('currentSudoku', JSON.stringify({
                ...sudoku, 
                gridToBeFilled: newGridToBeFilled, 
                history: updatedHistory
            }))
            return {
                ...sudoku, 
                gridToBeFilled: newGridToBeFilled, 
                history: updatedHistory
            }
        case "SET_SUDOKU":        
            let newSudoku = action?.data
            return {...newSudoku}
        default:
            return sudoku
    }
}

export default sudokuReducer