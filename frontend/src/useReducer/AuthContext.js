import React, {createContext, useContext, useState, useEffect} from 'react';
import {auth2} from '../firebase';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) =>{

    const[currentUser, setCurrentUser] = useState({});

    const signUp = (email, password) => {
        return auth2.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth2.onAuthStateChanged( user => {
            setCurrentUser(user);
        })
        return unsubscribe 
    }, [])
 
    return(
        <AuthContext.Provider value={{currentUser,signUp}}>
            {children}
        </AuthContext.Provider>
    )
}

export const  useAuth = () => useContext(AuthContext);


