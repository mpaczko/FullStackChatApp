import React,{ useContext, useState, useEffect, useCallback,useLayoutEffect } from 'react';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PeopleIcon from '@material-ui/icons/People';
import { useNavigate } from 'react-router-dom';
import { Avatar,IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutInitiate } from '../redux/actions';
import { UserContext } from '../users/users.provider';
import {returnName} from '../utilities/returnName';
import useComponentVisible from '../utilities/useCompVisibleHook';
import ReactTooltip from 'react-tooltip';


const Users = ({children}) => {

    const { getUsers } = useContext(UserContext);
    const [searchState, setSearchState] = useState();
    const { ref,isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  
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

    useEffect(() => {
        setSideList(filteredUsers)
    }, [filteredUsers])
    

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
                                            <div className='sidebar__headerAvatar'><Avatar src={currentUser?.photoURL} alt=""/></div>
                                                <p>Hello <span>{returnName(currentUser?.displayName)}</span> !</p>
                                                <div className="sidebar__headerRight">
                                                    <IconButton onClick={()=>navigate('/')}>
                                                        <PeopleIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={()=>navigate('/rooms')}>
                                                        <ForumIcon/>
                                                    </IconButton>
                                                    {/* <IconButton>
                                                        <EventNoteIcon/>
                                                    </IconButton> */}
                                                    <IconButton ref={ref} onClick={() => setIsComponentVisible(val => !val)} >
                                                        <MoreVertIcon />
                                                            {isComponentVisible &&  
                                                                <div className='headerRight__more'>
                                                                    <ul>
                                                                        <li><span
                                                                                data-background-color="#f0f1f2"
                                                                                data-text-color="gray"
                                                                                type="info"
                                                                                data-multiline="true"
                                                                                data-class="info-sky"
                                                                                data-html="true"
                                                                                data-tip="soon available :)"
                                                                            >Settings</span>
                                                                            </li>
                                                                        <ReactTooltip />
                                                                        <li onClick={handleAuth}>Logout</li>
                                                                    </ul>
                                                            </div>}
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
                                                        userId={user.data.userId}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {children}
                                    </div>
                        </>)
  
}

export default Users
