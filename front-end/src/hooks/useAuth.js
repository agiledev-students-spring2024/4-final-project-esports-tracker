import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const context =  useContext(AuthContext)
    if(!context){
        throw Error('useAuth context must be used inside context provider')
    }
    return context
}

export default useAuth