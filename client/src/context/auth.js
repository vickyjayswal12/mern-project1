//context api use for create global state which can use in different components one type of probs it is also hook
// for create context is crecontextateContext and for useContext

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
//create context
const AuthContext = createContext();

//state not a global
// const [auth,setAuth]=useState({
//     user:null,
//     token:""
// })

//just like Layout
const AuthProvider = ({ children }) => {
    //create global state
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    //default axios for passing header in every axios api request
    axios.defaults.headers.common['Authorization'] = auth?.token



    useEffect(() => {
        const data = localStorage.getItem("auth")
        //after render page store localstorage data in auth
        if (data) {
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
        //eslint-disable-next-line
    }, []);
    // [auth] means jab bhi auth change hoga tab useEffect run hoga

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider };
