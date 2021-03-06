import React,{ useState, useEffect, useContext, useRef } from 'react';
import { Avatar,IconButton } from '@material-ui/core';
import {InsertEmoticon} from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import {db} from "../firebase";
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { UserContext } from '../users/users.provider';
import { useFocus } from '../utilities/useFocus';
import Picker from 'emoji-picker-react';
import { gsap } from 'gsap';


const Chat = () => {


    const [input, setInput] = useState([]);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [picker, setPicker] = useState(false);
    const {id} = useParams();
    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("")
    const [UID, setUID] = useState("");
    const [messages, setMessages] = useState([]);
    const { idCU } = useContext(UserContext);
    const [inputRef, setInputFocus] = useFocus()
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
            if(slug==='rooms'){
                db.collection(slug)
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'asc').onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
            }
            else if(slug==='users'){
                db.collection('users')
                .doc(idCU)
                .collection('messages')
                .orderBy('timestamp', 'asc').onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
            }
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
            db.collection(slug)
            .doc(idCU)
            .collection('messages').add({
                messageFrom: UID,
                message: input,
                name: currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                messageTo: currentUser.uid,
                receiver: true
            });

            db.collection(slug)
            .doc(id)
            .collection('messages').add({
                messageFrom: currentUser.uid,
                message: input,
                name: currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                messageTo: UID,
            });

            setInput("");
        }
    }

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject.emoji);
        setInputFocus();
        setPicker(false);
    };

    useEffect(() => {
        if(input && chosenEmoji){
            setInput(input+""+chosenEmoji)
        }
        if(!input){
            setInput(chosenEmoji => chosenEmoji)
        }
    }, [chosenEmoji])


    const boxRef = useRef();

    useEffect(() => {
        gsap.fromTo(boxRef.current, {opacity: 0,x:'-200px'},{duration:0.7,opacity: 1,x:'0'})
    },[id]);


    const chatReciver = {
        marginLeft: "auto",
        color:"#fff",
        boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
        backgroundColor:"#0a11eb",
        fontWeight:600
    }


  return (
            <div ref={boxRef}
                className='chat'>
                    <div  className="chat__header">
                        <div className="chat__headerAvatar"><Avatar src={photoUrl} alt={name}/></div>
                        <div className="chat__headerInfo">
                            <h3>{name}</h3>
                            {messages.length!==0 && slug==='rooms' &&
                                <p>last seen{" "}
                                    {new Date(
                                        messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                                    }
                                </p>
                            }
                        </div>
                    {/* <div className="chat__headerRight">
                            <IconButton>
                                <SearchOutlined/>
                            </IconButton>
                            <IconButton>
                                <AttachFile/>
                            </IconButton>
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        </div> */}
                    </div>
                    <div  className="chat__body" >
                        {messages?.filter(el => el.messageFrom === UID).map((message,index) => (
                            <p  
                                key={index}
                                className={`chat__message`}
                                style={ message?.receiver===true || message.userId===currentUser.uid ? chatReciver : {}}>
                                {slug==='rooms' && <span className='chat__name'>{message.name}</span>}
                                {message.message}
                                <span className='chat__timestamp'>
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                                </span>
                            </p>  
                        ))}
                    </div>
                    <div className="chat__footer">
                        <IconButton onClick={()=>setPicker(state => !state)}>
                            <InsertEmoticon/>
                        </IconButton>
                        <div>
                        {picker ? <Picker onEmojiClick={onEmojiClick} /> : ""}
                        </div>
                        {chosenEmoji ? (
                            <span>{chosenEmoji?.emoji}</span>
                        ) : ""}
                        <form>
                            <input 
                                ref={inputRef}
                                value={input}
                                onChange={handleChange} 
                                placeholder='Type a message' 
                                type="text">
                            </input>
                            <button onClick={slug==='rooms' ? sendMessage : sendUserMessage} type="submit">
                                Send
                            </button>
                        </form>
                    </div>
                </div>

  )
}

export default Chat

