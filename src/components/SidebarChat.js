import React,{useEffect, useState} from 'react';
import { Avatar,IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { db } from "../firebase";
import { useSelector } from 'react-redux';
import { storage } from '../firebase';

const SidebarChat = ({id, name, addNewChat, photoUrl, collection}) => {

  const [file, setFile] = useState();
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
    uploadFiles(file);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
  }

  const handleChange = (e) => {
    setNewChat({...newChat,chatName:e.target.value})
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
              <>
                <div className='sidebarChat'>
                      <p>
                        <input type="text" value={chatName} onChange={handleChange} placeholder='Chat name' required/>
                      </p>
                      <p>
                        <input type="file" value={file} onChange={chatPhotoHandler} className="input" />
                        {/* <Avatar src={photo ? photo : ''}  alt=""/> */}
                        <p>{progress} %</p>
                      </p>
                      <button onClick={handleSubmit}>Add new Chat</button>
                </div>
              </>
        }
      </>
  )

}

export default SidebarChat


