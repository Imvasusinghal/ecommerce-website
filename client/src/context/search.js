
import { useState, useContext, createContext } from "react";

const SearchContext= createContext();

const SearchProvider= ({children}) => {
    const [auth, setAuth]= useState({
        keyword: "",
        results: [],
    });

    return (
        <SearchContext.Provider value= {[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

//CUSTOM HOOK
const useSearch= () => useContext(SearchContext);      //IN CUSTOM HOOK IT ALWAYS STARTS WITH 'use'

export {useSearch, SearchProvider};