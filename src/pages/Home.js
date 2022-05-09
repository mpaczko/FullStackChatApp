import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../components/Chat';
import { logoutInitiate } from '../redux/actions';
import MainSideBar from '../components/MainSideBar';

const Home = () => {


  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAuth = () => {
    if(currentUser){
      dispatch(logoutInitiate());
    }
  }

  return (
    <>
    {currentUser &&
      <>
        Welcome {currentUser?.displayName}
        <button onClick={handleAuth}>Logout</button>
        <div className="app__body">
            <MainSideBar/>
            <Chat/>
        </div>
      </>  
    }
    </>

  )
}

export default Home