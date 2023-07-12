import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext= createContext();

const AuthProvider= ({children}) => {
    const [auth, setAuth]= useState({
        user:null,
        token:"",
    });

    //DEFAULT AXIOS
    axios.defaults.headers.common['Authorization']= auth?.token;

    useEffect(() => {                                  //IT'S A FUNCTION UNDER WHICH WE CAN EXECUTE MULTIPLE FUNCTIONS
        const data = localStorage.getItem('auth');
        if(data){
            const parseData= JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            });
        }
        //eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value= {[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

//CUSTOM HOOK
const useAuth= () => useContext(AuthContext);      //IN CUSTOM HOOK IT ALWAYS STARTS WITH 'use'

export {useAuth, AuthProvider};