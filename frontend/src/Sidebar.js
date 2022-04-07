import React,{useState,useEffect} from 'react'
import "./Sidebar.css"
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar,IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from "./firebase";

const Sidebar = () => {

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
    

  return (
    <div className='sidebar'>
        <div className="sidebar__header">
            <Avatar src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"/>
            <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
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
                    key={room.id}
                    id={room.id}
                    name={room.data.name}
                />
            ))}
        </div>
    </div>
  )
}

export default Sidebar
