import React,{ useState, useEffect } from 'react'
import './Chat.css'
import { Avatar,IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AttachFile, Mic, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import db from "./firebase";
import firebase from 'firebase/compat/app';

const Chat = () => {

    const [input, setInput] = useState();
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const[{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));
            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc').onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
                
        }
    }, [roomId])

    const handleChange = (e) => {
        setInput(e.target.value)
    };

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection('rooms')
        .doc(roomId)
        .collection('messages').add({
            userId: user.uid,
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };

  return (
    <div className='chat'>
        <div className="chat__header">
            <Avatar />

            <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>last seen{" "}
                {new Date(
                    messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                }
            </p>
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
                <p
                    className={`chat__message ${message?.userId === user.uid
                    && "chat__reciever"}`}>
                    <span className='chat__name'>{message.name}</span>
                    {message.message}
                    <span className='chat__timestamp'>
                       {new Date(message.timestamp?.toDate()).toUTCString()}
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