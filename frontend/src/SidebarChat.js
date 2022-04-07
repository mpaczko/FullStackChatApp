import React from 'react'
import './SidebarChat.css'
import { Avatar,IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import db from "./firebase";

const SidebarChat = ({id, name, addNewChat}) => {

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if(roomName){
      db.collection("rooms").add({
        name: roomName,
      })
    }
  };

  return !addNewChat ? (
      <Link to={`/rooms/${id}`}>
          <div className='sidebarChat'>
          <Avatar/>
          <div className="sidebarChat__info">
              <h2>{name}</h2>
              <p>This is the last message</p>
          </div>
        </div>
      </Link>
  ) : (
      <div onClick={createChat}
        className='sidebarChat'>
              <h2>Add new Chat</h2>
      </div>
  )

}

export default SidebarChat