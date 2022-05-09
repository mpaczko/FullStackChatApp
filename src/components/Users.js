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
import {returnName} from '../utilities/returnName';


const Users = ({children}) => {

    const { getUsers } = useContext(UserContext);
    const [searchState, setSearchState] = useState();
  
    useLayoutEffect(() => {
      getUsers();
    }, []);

    const { filteredUsers } = useContext(UserContext);

    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
    const handleAuth = () => {
      if(currentUser){
        dispatch(logoutInitiate());
      }
    }
    const [sideList, setSideList] = useState(filteredUsers);

    const handleChange = (e) => {
        setSearchState(e.target.value)
    };

    useEffect(() => {
        if(searchState){
            let searchToLower = searchState.trim().toLowerCase();
            const newSideList = filteredUsers.filter(el => el.data.name.toLowerCase().includes(searchToLower));
            setSideList(newSideList)
        }
        if(!searchState){
            setSideList(filteredUsers)
        }
    }, [searchState])
    


    return   (
                        <>
                                    <div className="app__body">
                                        <div className='sidebar'>
                                            <div className="sidebar__header">
                                                <Avatar src={currentUser?.photoURL} alt=""/>
                                                Hello {returnName(currentUser?.displayName)}!
                                                <IconButton onClick={handleAuth}>Logout</IconButton>
                                                <div className="sidebar__headerRight">
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
                                                    <input placeholder='Search user' 
                                                    value={searchState} 
                                                    onChange={handleChange}
                                                    type="text"/>
                                                </div>
                                            </div>
                                            <div className="sidebar__chats">
                                                {sideList && sideList?.map(user => (
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
                        </>)
  
}

export default Users
