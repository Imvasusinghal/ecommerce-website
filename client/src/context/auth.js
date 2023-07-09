import { useState, useContext, createContext } from "react";

const AuthContext= createContext();

const AuthProvider= ({children}) => {
    const [auth, setAuth]= useState({
        user:null,
        token:"",
    });
    return (
        <AuthContext.Provider value= {[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

//CUSTOM HOOK
const userAuth= () => useContext(AuthContext);      //IN CUSTOM HOOK IT ALWAYS STARTS WITH 'use'

export {userAuth, AuthProvider};