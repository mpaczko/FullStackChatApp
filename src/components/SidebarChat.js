import React,{useEffect, useState, useRef} from 'react';
import { Avatar,IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { db } from "../firebase";
import { useSelector } from 'react-redux';
import { storage } from '../firebase';
import ForumIcon from '@material-ui/icons/PeopleOutline';


const SidebarChat = ({id, name, addNewChat, photoUrl, collection}) => {

  const [file, setFile] = useState();
  const [fileURL, setFileURL] = useState();
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState();
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
    if(fileRef.current.value){
      const fileUrl = URL.createObjectURL(file);
      setFileURL(fileUrl);
    }
  };


  const handleSubmit = (e) => {
    if(newChat.chatName && fileURL){
      e.preventDefault();
      uploadFiles(file);
      setError('');
    }
    else if(!newChat.chatName){
      setError('Please provide chat name');
    }
    else if(!fileURL){
      setError('Please provide chat image');
    }
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
      (error) => alert("Sorry can't upload this picture file."),
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
    if(messages && messages.length){
      const list = [...messages].filter(el => el.messageFrom === currentUser.uid)
      let lastMessage = list[0];
      return lastMessage?.message
    }
    else{
      return
    }
  }

  const fileRef = useRef();

  const displayAddNewChat = () => {
    setVisible(val => !val);
    setNewChat({...newChat,chatName:''});
    setFile({});
    setFileURL("");
    if(fileRef && fileRef?.current.value){
      fileRef.current.value = '';
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
        <div onClick={displayAddNewChat}
          className='sidebarChat'>
            <Avatar src="+"  alt='+'/>
            <div className="sidebarChat__info">
              <p>New group chat</p>
            </div>
        </div>
        {visible && 
              <>
                <div className='addSidebarChat'>
                        <div className='addSidebarChat__subContainer'>
                              <div className="addSidebarChat__Input">
                                <ForumIcon/>
                                <input type="text" value={chatName} onChange={handleChange} placeholder='New chat name' required/>
                              </div>
                              <div className='addSidebarChat__Preview'>{fileURL ? <div className='sidebarChat__img'><img src={fileURL} /></div> :<div className='sidebarChat__img'></div> }</div>
                              <div className='addSidebarChat__File'>
                                  <button className='addSidebarChat__fileButton' onClick={() => fileRef.current.click()}>
                                    Upload chat picture
                                  </button>
                                  <input type="file" ref={fileRef} onChange={chatPhotoHandler} multiple={false} hidden/>
                              </div>
                              <div className='addSidebarChat__Preview'>
                                {error && <p className='addSidebarChat__error'>{error}</p>}
                              </div>
                              <div className='addSidebarChat__btn'>
                                <button onClick={handleSubmit}>Add</button>
                              </div>
                        </div>
                      <span className='addSidebarChat__progressBar' style={{width:`${progress}%`}}></span>
                </div>
              </>
        }
      </>
  )

}

export default SidebarChat


