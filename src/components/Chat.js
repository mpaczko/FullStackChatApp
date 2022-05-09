import React,{ useState, useEffect } from 'react'
import '../styles/Chat.css'
import { Avatar,IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AttachFile, Mic, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from "../firebase";
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';



const Chat = () => {

    const [input, setInput] = useState();
    const {id} = useParams();
    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("")
    const [UID, setUID] = useState("");
    const [messages, setMessages] = useState([]);
    // const [userMessages, setUserMessages] = useState([]);
    const slug = window.location.pathname.split('/')[1];
    const {currentUser} = useSelector((state) => state.user);


    useEffect(() => {

        if(id && slug){
            db.collection(slug)
                .doc(id)
                .onSnapshot(snapshot => (
                setName(snapshot.data().name),
                setPhotoUrl(snapshot.data().photoUrl),
                setUID(snapshot.data().userId)
            )); 
            db.collection(slug)
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'asc').onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            )) 
        }

    }, [id])

    const handleChange = (e) => {
        setInput(e.target.value)
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if(input.trim()){
            db.collection(slug)
            .doc(id)
            .collection('messages').add({
                userId: currentUser.uid,
                message: input,
                name: currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
    
            setInput("");
        }
    };

    const sendUserMessage = (e) => {
        e.preventDefault();
        if(input.trim()){
            db.collection('messages').add({
                userId: currentUser.uid,
                message: input,
                name: currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                receiverId: UID,
            })
            setInput("");
        }
    }

  return (
      <>
            <div className='chat'>
                    <div className="chat__header">
                        <Avatar src={photoUrl} alt={name}/>
                        <div className="chat__headerInfo">
                        <h3>{name}</h3>
                        <h5>{UID}</h5>
                        {messages.length!==0 && slug==='rooms' &&
                            <p>last seen{" "}
                                {new Date(
                                    messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                                }
                            </p>
                        }
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
                            <p
                                className={`chat__message ${currentUser.uid===message.userId && "chat__reciever"}`}>
                                {slug==='rooms' && <span className='chat__name'>{message.name}</span>}
                                {message.message}
                                <h4>{message.userId}</h4>
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
                            <button onClick={slug==='rooms' ? sendMessage : sendUserMessage} type="submit">
                                Send a message
                            </button>
                        </form>
                        <Mic/>
                    </div>
                </div>
        </>

  )
}

export default Chat



    // .onSnapshot((snapshot) => {
    //     const messagesArr = [];
    //     snapshot.forEach((doc) => {
    //         messagesArr.push(doc.data())
    //     })
    //     const userMessages = [...messagesArr].filter(el => el.receiverId == UID)

    //     setMessages(userMessages)
    //     // setMessages(messagesArr)
    // }) 

    // .onSnapshot((snapshot) => (
    //     setMessages(snapshot.docs.map((doc) => doc.data()))
    // )) 

 
    // if(messages.length){
    //     console.log('ess')
    //     console.log(UID)
    //     console.log(currentUser.uid)
    //     console.log('ess')
    //     const newMessages = [...messages].filter(el => el.receiverId === UID || el.userId === currentUser.uid);
    //     // setUserMessages(newMessages)
    //     console.log(newMessages)
    // }