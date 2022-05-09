import React,{ useContext, useState, useEffect, useCallback,useLayoutEffect } from 'react';
import "../styles/Sidebar.css";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import { useNavigate } from 'react-router-dom';
import { Avatar,IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutInitiate } from '../redux/actions';
import { UserContext } from '../users/users.provider';


const Users = ({children}) => {

    const { getUsers } = useContext(UserContext);
  
    useLayoutEffect(() => {
      getUsers();
    }, []);

    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
    const handleAuth = () => {
      if(currentUser){
        dispatch(logoutInitiate());
      }
    }
    const { filteredUsers } = useContext(UserContext);


    return filteredUsers &&  
                        <>
                                    Welcome {currentUser?.displayName}
                                    <button onClick={handleAuth}>Logout</button>
                                    <div className="app__body">
                                        <div className='sidebar'>
                                            <div className="sidebar__header">
                                                <Avatar src={currentUser?.photoURL} alt=""/>
                                                <div className="sidebar__headerRight">
                                                    <h5>{currentUser?.uid}</h5>
                                                    <IconButton onClick={()=>navigate('/')}>
                                                        <PeopleIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={()=>navigate('/rooms')}>
                                                        <ForumIcon/>
                                                    </IconButton>
                                                    <IconButton>
                                                        <MoreVertIcon/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div className="sidebar__search">
                                                <div className="sidebar__searchContainer">
                                                    <SearchOutlined/>
                                                    <input placeholder='Search user' type="text"/>
                                                </div>
                                            </div>
                                            <div className="sidebar__chats">
                                                {filteredUsers.map(user => (
                                                    <SidebarChat 
                                                        collection={'users'}
                                                        key={user.id}
                                                        id={user.id}
                                                        photoUrl={user.data?.photoUrl}
                                                        name={user.data.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {children}
                                    </div>
                        </>
  
}

export default Users
