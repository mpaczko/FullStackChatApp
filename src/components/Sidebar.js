import React,{useState,useEffect} from 'react';
import "../styles/Sidebar.css";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from "../firebase";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import { Avatar,IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutInitiate } from '../redux/actions';
import { returnName } from '../utilities/returnName';

const Sidebar = ({children}) => {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        })

        return () => {
            unsubscribe();
        }

    }, []);

    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
    const handleAuth = () => {
      if(currentUser){
        dispatch(logoutInitiate());
      }
    }
    

  return (
      <>
                <div className="app__body">
                    <div className='sidebar'>
                        <div className="sidebar__header">
                            <Avatar src={currentUser?.photoURL} alt=""/>
                            Welcome {returnName(currentUser?.displayName)} !
                            <button onClick={handleAuth}>Logout</button>
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
                                <input placeholder='Search or start new chat' type="text"/>
                            </div>
                        </div>
                        <div className="sidebar__chats">
                            <SidebarChat addNewChat />
                            {rooms.map(room => (
                                <SidebarChat 
                                    collection={'rooms'}
                                    key={room.id}
                                    id={room.id}
                                    name={room.data.name}
                                />
                            ))}
                        </div>
                    </div>
                    {children}
                </div>
      </>
  )
}

export default Sidebar
