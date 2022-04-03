import React from 'react'
import './Chat.css'
import { Avatar,IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AttachFile, Mic, InsertEmoticon, SearchOutlined } from '@material-ui/icons';

const Chat = ({ messages }) => {
  return (
    <div className='chat'>
        <div className="chat__header">
            <Avatar />

            <div className="chat__headerInfo">
            <h3>Room name</h3>
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
            {messages.map((message) => (
                <p className={`chat__message ${message.received && "chat__reciever"}`}>
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
                <input placeholder='Type a message' type="text">
                </input>
                <button type="submit">
                    Send a message
                </button>
            </form>
            <Mic/>
        </div>
    </div>
  )
}

export default Chat