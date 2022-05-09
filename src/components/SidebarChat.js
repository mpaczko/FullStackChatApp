import React,{useEffect, useState} from 'react'
import '../styles/SidebarChat.css'
import { Avatar,IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import db from "../firebase";

const SidebarChat = ({id, name, addNewChat, photoUrl, collection}) => {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if(id){
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc')
      .onSnapshot(snapshot => (
        setMessages(snapshot.docs.map((doc) => doc.data()))
      ))
    }
  }, [])
  

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if(roomName){
      db.collection("rooms").add({
        name: roomName,
      })
    }
  };

  return !addNewChat ? (
      <Link to={`/${collection}/${id}`}>
          <div className='sidebarChat'>
          <Avatar src={photoUrl} alt={name}/>
          <div className="sidebarChat__info">
              <h2>{name}</h2>
              <p>{messages[0]?.message}</p>
          </div> 
        </div>
      </Link>
  ) : (
      <div onClick={createChat}
        className='sidebarChat'>
              <h2>New group chat</h2>
      </div>
  )

}

export default SidebarChat