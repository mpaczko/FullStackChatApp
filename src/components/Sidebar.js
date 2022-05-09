import React,{useState,useEffect} from 'react';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import {db} from "../firebase";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import { Avatar,IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutInitiate } from '../redux/actions';
import { returnName } from '../utilities/returnName';
import EventNoteIcon from '@material-ui/icons/EventNote';
import useComponentVisible from '../utilities/useCompVisibleHook';
import ReactTooltip from 'react-tooltip';

const Sidebar = ({children}) => {

    const [rooms, setRooms] = useState([]);
    const [searchState, setSearchState] = useState();
    const { ref,isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        })

        return () => {
            unsubscribe();
        }

    }, []);

    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
    const handleAuth = () => {
      if(currentUser){
        dispatch(logoutInitiate());
      }
    }

    useEffect(() => {
    setSideList(rooms)
    }, [rooms])

    const [sideList, setSideList] = useState(rooms);


    const handleChange = (e) => {
        setSearchState(e.target.value)
    };

    useEffect(() => {
        if(searchState){
            let searchToLower = searchState.trim().toLowerCase();
            const newSideList = rooms.filter(el => el.data.name.toLowerCase().includes(searchToLower));
            setSideList(newSideList)
        }
        if(!searchState){
            setSideList(rooms)
        }
    }, [searchState])



  return (
      <>
                <div className="app__body">
                    <div className='sidebar'>
                        <div className="sidebar__header">
                            <Avatar src={currentUser?.photoURL} alt=""/>
                            Hello {returnName(currentUser?.displayName)}!
                            <div className="sidebar__headerRight">
                                <IconButton onClick={()=>navigate('/')}>
                                    <PeopleIcon/>
                                </IconButton>
                                <IconButton onClick={()=>navigate('/rooms')}>
                                    <ForumIcon/>
                                </IconButton>
                                {/* <IconButton>
                                    <EventNoteIcon/>
                                </IconButton> */}
                                <IconButton ref={ref}>
                                    <MoreVertIcon onClick={() => setIsComponentVisible(val => !val)} />
                                        {isComponentVisible &&  
                                            <div className='headerRight__more'>
                                                <ul>
                                                    <li onClick={handleAuth}>Logout</li>
                                                    <li><span
                                                        data-background-color="#f0f1f2"
                                                        data-text-color="gray"
                                                        type="info"
                                                        data-multiline="true"
                                                        data-class="info-sky"
                                                        data-html="true"
                                                        data-tip="soon available :)"
                                                    >Settings</span>
                                                    </li>
                                                    <ReactTooltip />
                                                </ul>
                                        </div>}
                                    </IconButton>
                            </div>
                        </div>
                        <div className="sidebar__search">
                            <div className="sidebar__searchContainer">
                                <SearchOutlined/>
                                <input placeholder='Search user' 
                                                    value={searchState} 
                                                    onChange={handleChange}
                                                    type="text"/>
                            </div>
                        </div>
                        <div className="sidebar__chats">
                            <SidebarChat addNewChat />
                            {sideList && sideList?.map(room => (
                                <SidebarChat 
                                    collection={'rooms'}
                                    key={room.id}
                                    id={room.id}
                                    photoUrl={room.data?.photoUrl}
                                    name={room.data.name}
                                />
                            ))}
                        </div>
                    </div>
                    {children}
                </div>
      </>
  )
}

export default Sidebar
