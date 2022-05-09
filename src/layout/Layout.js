import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import { Avatar,IconButton} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { logoutInitiate } from '../redux/actions';

const Layout = ({children}) => {

    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
    const handleAuth = () => {
      if(currentUser){
        dispatch(logoutInitiate());
      }
    }


    return (
            <>
                Welcome {currentUser?.displayName}
                <button onClick={handleAuth}>Logout</button>
                <div className="app__body">
                    <div className='sidebar'>
                        <div className="sidebar__header">
                            <Avatar src={'lp'} alt={`${true} photo`}/>
                            <div className="sidebar__headerRight">
                                <IconButton onClick={()=>navigate('/')}>
                                    <PeopleIcon/>
                                </IconButton>
                                <IconButton onClick={()=>navigate('/rooms')}>
                                    <ForumIcon/>
                                </IconButton>
                                <IconButton>
                                    <MoreVertIcon/>
                                </IconButton>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </>
  )
}

export default Layout