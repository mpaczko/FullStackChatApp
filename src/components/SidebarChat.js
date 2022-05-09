import React,{useEffect, useState, useRef} from 'react';
import { Avatar,IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { db } from "../firebase";
import { useSelector } from 'react-redux';
import { storage } from '../firebase';


const SidebarChat = ({id, name, addNewChat, photoUrl, collection , userId}) => {

  const [file, setFile] = useState();
  const [fileURL, setFileURL] = useState();
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const {currentUser} = useSelector((state) => state.user);
  const [newChat, setNewChat] = useState({
    creator: currentUser.uid,
    chatName:'',
    photo: null,
  });
  

  const {creator, chatName, photo} = newChat; 

  useEffect(() => {
    if(id  && collection){
      db.collection(collection).doc(id).collection('messages').orderBy('timestamp','desc')
      .onSnapshot(snapshot => (
        setMessages(snapshot.docs.map((doc) => doc.data()))
      ))
    }
  }, [])


  const chatPhotoHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
    const fileUrl = URL.createObjectURL(file);
    setFileURL(fileUrl);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFiles(file);
  }

  useEffect(() => {
    if(chatName && photo){
      db.collection('rooms').add({
        creator: creator,
        name: chatName,
        photoUrl: photo
      })
      setNewChat({
        ...newChat,
        chatName: '',
        photo: null,
      })
    }
    setFile({});
    setFileURL("");
    setProgress(0);
    setVisible(false);
  }, [photo])
  

  const uploadFiles = (file) => {
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setNewChat({...newChat, photo: url});
          });
      }
    );
  };


  const handleChange = (e) => {
    setNewChat({...newChat,chatName:e.target.value})
  };

  const showLastUserMessage = () => {
    if(messages.length){
      const list = [...messages].filter(el => el.messageFrom === currentUser.uid)
      let lastMessage = list[0];
      return lastMessage.message
    }
  }

  return !addNewChat ? (
      <Link to={`/${collection}/${id}`}>
          <div className='sidebarChat'>
          <Avatar src={photoUrl} alt={name}/>
          <div className="sidebarChat__info">
              <h2>{name}</h2>
              {collection==='rooms' && <p>{messages[0]?.message}</p>}
              {collection==='users' && <p>{showLastUserMessage()}</p>} 
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
              <>
                <div className='sidebarChat'>
                      <p>
                        <input type="text" value={chatName} onChange={handleChange} placeholder='Chat name' required/>
                      </p>
                      <p>
                        <input type="file" onChange={chatPhotoHandler}/>
                      </p>
                      {fileURL && <img className='sidebarChat__img' src={fileURL}/>}
                      <button onClick={handleSubmit}>Add new Chat</button>
                      <p>{progress} %</p>
                </div>
              </>
        }
      </>
  )

}

export default SidebarChat


