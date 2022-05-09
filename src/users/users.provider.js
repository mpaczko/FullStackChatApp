import React, { useState, createContext,useEffect } from 'react';
import db from '../firebase';
import {  useSelector } from 'react-redux';



const data = [];
const filteredData =[];
let id;

const initialContextState = {
    data,
    filteredData,
    id,
    getUsers: () => {},
    filterUsers: () =>{},
};

export const UserContext = createContext(initialContextState);


const UserStoreProvider = ({children}) => {

    const [users, setUsers] = useState(data);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [idCU, setIdCU] = useState();
    const [loading, setLoading] = useState(false);
    const {currentUser} = useSelector((state) => state.user);

    const userUid = currentUser?.uid

    const getUsers = () => {
        setLoading(true)
        const unsubscribe = db.collection('users').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        })
        return () => {
            unsubscribe();
        }
    }

    useEffect(() => {
        const usersList = [...users].filter(el => el.data.userId !== userUid);
        const userCurrent = [...users].filter(el => el.data.userId === userUid);
        setIdCU(userCurrent[0]?.id)
        setFilteredUsers(usersList)
        setLoading(false)
    }, [users])
    



    return (
        <UserContext.Provider value={{users, filteredUsers, idCU, getUsers}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserStoreProvider;



