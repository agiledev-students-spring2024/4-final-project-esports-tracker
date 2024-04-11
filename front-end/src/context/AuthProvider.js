import {createContext, useReducer, useEffect} from "react";

const AuthContext = createContext({});

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state

    }
}

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {user: null});
    console.log('auth context state', state)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])


    return (<AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContext;