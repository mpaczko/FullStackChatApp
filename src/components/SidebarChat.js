import React,{useEffect, useState} from 'react'
import '../styles/SidebarChat.css'
import { Avatar,IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import db,{firebaseApp} from "../firebase";
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/storage';


const SidebarChat = ({id, name, addNewChat, photoUrl, collection}) => {

  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const {currentUser} = useSelector((state) => state.user);
  const [newChat, setNewChat] = useState({
    creator: currentUser.uid,
    name:'',

  });

  useEffect(() => {
    if(id){
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc')
      .onSnapshot(snapshot => (
        setMessages(snapshot.docs.map((doc) => doc.data()))
      ))
    }
  }, [])
  

  const onFileChange = (e) => {
    const file = e.target.files[0]
    const storageRef = firebaseApp.storage().ref()
    const  fileRef = storageRef.child(file.name)
    fileRef.put(file).then(()=> {
      console.log('file put')
    })
  }

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if(roomName && currentUser){
      db.collection("rooms").add({
        creator: currentUser.uid,
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
      <>
        <div onClick={() => setVisible(val => !val)}
          className='sidebarChat'>
            <Avatar src="+"  alt='+'/>
            <div className="sidebarChat__info">
              <p>New group chat</p>
            </div>
        </div>
        {visible && 
              <div className='sidebarChat'>
                  <div className="sidebarChat__info">
                    <p>Name:
                      <input />
                    </p>
                    <p>Photo:
                      <input type="file" onChange={onFileChange}/>
                    </p>
                    <button type='submit' onClick={createChat}>Submit</button>
                  </div>
              </div>
        }
      </>
  )

}

export default SidebarChat