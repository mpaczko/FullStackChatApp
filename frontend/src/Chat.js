import React,{ useState, useEffect } from 'react'
import './Chat.css'
import { Avatar,IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AttachFile, Mic, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from "./firebase";

const Chat = ({ messages }) => {

    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if(roomId){
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));
        }
    }, [roomId])

    const handleChange = (e) => {
        setInput(e.target.value)
    };

    const sendMessage = (e) =>{
        e.preventDefault();
        console.log(input)
        setInput("")
    };

  return (
    <div className='chat'>
        <div className="chat__header">
            <Avatar />

            <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
        <div className="chat__body">
            {messages?.map((message) => (
                <p key={message?._id}
                className={`chat__message ${message.received && "chat__reciever"}`}>
                    <span className='chat__name'>{message.name}</span>
                    {message.message}
                    <span className='chat__timestamp'>
                        {message.timestamp}
                    </span>
                </p>
            ))}
        </div>
        <div className="chat__footer">
            <InsertEmoticon/>
            <form>
                <input 
                    value={input}
                    onChange={handleChange} 
                    placeholder='Type a message' 
                    type="text">
                </input>
                <button onClick={sendMessage} type="submit">
                    Send a message
                </button>
            </form>
            <Mic/>
        </div>
    </div>
  )
}

export default Chat