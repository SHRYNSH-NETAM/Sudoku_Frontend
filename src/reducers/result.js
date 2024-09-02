const myResultReducer = (myResult = [], action) => {
    switch (action.type) {
        case "GET_RESULT":
            return action?.result?.data
        case "GET_ERROR":
            return action?.error
        default:
            return myResult
    }
}

export default myResultReducer