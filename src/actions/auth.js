import * as api from '../api'

export const signin = (formData, navigate,setRecError) => async (dispatch) => {
    try {
        const {data} = await api.signin(formData)
        dispatch({type:'AUTH', data})
        navigate('/')
    } catch (error) {
        setRecError({hasError: true, message:error.response.data})
        console.log(error.message)
        return
    }
}
export const signup = (formData, navigate, setRecError) => async (dispatch) => {
    try {
        const {data} = await api.signup(formData) //jwt token
        console.log(data)
        dispatch({type:'AUTH', data})
        navigate('/')
    } catch (error) {
        setRecError(error.response.data)
        console.log(error.message)
        return
    }
}

export const deleteAccount = (navigate) => async (dispatch) => {
    try {
        await api.deleteAccount()
        dispatch({type:'DELETE_ACCOUNT'})
        navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}