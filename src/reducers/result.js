const myResultReducer = (myResult = [], action) => {
    switch (action.type) {
        case "GET_RESULT":
            return action?.result?.data
        default:
            return myResult
    }
}

export default myResultReducer