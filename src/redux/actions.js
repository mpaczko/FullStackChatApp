import * as types from './actionTypes';
import {auth, googleAuthProvider, facebookAuthProvider } from '../firebase';
import {db} from "../firebase";


const registerStart = () => ({
    type: types.REGISTER_START
})

const registerSuccess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user
})

const registerFail = (error) => ({
    type: types.REGISTER_FAIL,
    payload: error
})

const loginStart = () => ({
    type: types.LOGIN_START
})

const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user
})

const loginFail = (error) => ({
    type: types.LOGIN_FAIL,
    payload: error
})

const logoutStart = () => ({
    type: types.LOGOUT_START
})

const logoutSuccess = (user) => ({
    type: types.LOGOUT_SUCCESS,
    payload: user
})

const logoutFail = (error) => ({
    type: types.LOGOUT_FAIL,
    payload: error
})

const googleSignInStart = () => ({
    type: types.GOOGLE_SIGN_IN_START
})

const googleSignInSuccess = (user) => ({
    type: types.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
})

const googleSignInFail = (error) => ({
    type: types.GOOGLE_SIGN_IN_FAIL,
    payload: error
})

const fbSignInStart = () => ({
    type: types.FB_SIGN_IN_START
})

const fbSignInSuccess = (user) => ({
    type: types.FB_SIGN_IN_SUCCESS,
    payload: user
})

const fbSignInFail = (error) => ({
    type: types.FB_SIGN_IN_FAIL,
    payload: error
})

export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user
})


const addUserToCollection = (user,name) =>{
    db.collection('users')
    .add({
        name: name,
        email: user.email,
        userId: user.uid
    });
}

const addSMUserToCollection = (user) => {

    const userIds = [];
    db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            userIds.push(doc.data().userId);
        })
        const checkUser = [...userIds].filter(el => el === user.uid);
        if(!checkUser.length){
            db.collection('users')
                .add({
                    email: user.email,
                    name: user.displayName,
                    userId: user.uid,
                    photoUrl: user.photoURL
                })
        }
        else{ 
            return
        }
    })
    
}




export const registerInitiate = (email, password, displayName) => {
    return function(dispatch){
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
            user.updateProfile({
                displayName
            })
            addUserToCollection(user,displayName);
            dispatch(registerSuccess(user));

        }).catch((error) => dispatch(registerFail(error.message)));
    }
}

export const loginInitiate = (email, password) => {
    return function(dispatch){
        dispatch(loginStart());
        auth.signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch(loginSuccess(user));
        })
        .catch((error) => dispatch(loginFail(error.message)));
    }
}

export const logoutInitiate = () => {
    return function(dispatch){
        dispatch(logoutStart());
        auth
        .signOut()
        .then(() => dispatch(logoutSuccess()))
        .catch((error) => dispatch(logoutFail(error.message)));
    }
}

export const googleSignInInitiate = () => {
    return function(dispatch){
        dispatch(googleSignInStart());
        auth.signInWithPopup(googleAuthProvider)
        .then(({user}) => {
            addSMUserToCollection(user);
            dispatch(googleSignInSuccess (user));
        })
        .catch((error) => dispatch(googleSignInFail(error.message)));
    }
}

export const fbSignInInitiate = () => {
    return function(dispatch){
        dispatch(fbSignInStart());
        auth.signInWithPopup(facebookAuthProvider)
        .then(({user}) => {
            addSMUserToCollection(user);
            dispatch(fbSignInSuccess(user));
        })
        .catch((error) => dispatch(fbSignInFail(error.message)));
    }
}